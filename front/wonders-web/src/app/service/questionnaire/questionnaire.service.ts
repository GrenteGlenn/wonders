import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../../model/Country';
import { QuizAnswer, QuizLine, QuizQuestion, QuizResponseCreate, UserAnswerCreate } from '../../model/Question';
import { AuthentificationService } from '../auth/authentification.service';
import { AIQuizzCountry } from '../../model/AI';
import { AnswerAI } from '../../model/Answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {
  private apiUrl = environment.Quiz;
  private aiUrl = environment.Country;

  constructor(
    private http: HttpClient,
    private authService: AuthentificationService
  ) {}

  //Get les countries
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/api/countries`);
  }
  // getQuizLines(): Observable<QuizLine[]> {
  //   return this.http
  //     .get<QuizLine[]>(`${this.apiUrl}/api/quiz-line`)
  //     .pipe(
  //       map((lines) =>
  //         lines.filter((line) => line.Quiz && line.Quiz.name === 'Type of vacation').sort((a, b) => a.step - b.step)
  //       )
  //     );
  // }

  // getQuizAnswers(): Observable<QuizAnswer[]> {
  //   return this.http.get<QuizAnswer[]>(`${this.apiUrl}/api/quiz-answer-text`);
  // }

  getPricingQuizWithAnswers(): Observable<QuizQuestion[]> {
    return forkJoin({
      lines: this.getQuizLines(),
      answers: this.getQuizAnswers()
    }).pipe(
      map(({ lines, answers }) => {
        return lines.map((line) => ({
          questionData: line,
          answers: answers.filter((answer) => answer.quiz_line_id === line.id)
        }));
      })
    );
  }

  createQuizResponse(quiz_id: number): Observable<any> {
    const userId = this.getUserIdFromToken();
    const quizResponse: QuizResponseCreate = {
      user_id: userId,
      quiz_id: quiz_id
    };

    return this.http.post<any>(`${this.apiUrl}/api/quiz-response`, quizResponse);
  }

  // Sauvegarde la réponse de l'utilisateur
  saveUserAnswer(answer: Partial<UserAnswerCreate>): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/user-answer`, answer);
  }

  // Récupère toutes les réponses de l'utilisateur
  getUserAllAnswers(): Observable<any> {
    const userId = this.getUserIdFromToken();
    return this.http.get(`${this.apiUrl}/api/user-answer?user_id=${userId}`);
  }

  // Extrait l'ID utilisateur du token
  private getUserIdFromToken(): number {
    const token = localStorage.getItem('UserToken');
    // Décodage du token JWT
    if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      return tokenData.userId;
    }
    throw new Error('User not authenticated');
  }

  // Met à jour une réponse existante
  updateUserAnswer(answerId: number, updatedAnswer: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/user-answer/${answerId}`, updatedAnswer);
  }

  // Récupère les réponses d'un utilisateur pour un quiz spécifique
  getUserAnswers(quizResponseId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/user-answer?quiz_response_id=${quizResponseId}`);
  }

  saveQuizAnswer(
    quizId: number,
    quizLineId: number,
    answerId: number,
    isBoolean: boolean = true,
    text: string = ''
  ): Observable<any> {
    return this.createQuizResponse(quizId).pipe(
      switchMap((response) => {
        const userAnswer: Partial<UserAnswerCreate> = {
          quiz_answer_text_id: answerId,
          quiz_line_id: quizLineId,
          quiz_response_id: response.id,
          boolean: isBoolean,
          text: text
        };
        return this.saveUserAnswer(userAnswer);
      })
    );
  }

  // Obtenir les suggestions de l'AI pour le pays
  getAIProposition(answerUser: AIQuizzCountry): Observable<AnswerAI> {
    return this.http.post<AnswerAI>(`${this.aiUrl}/api/countries/ai_get_country`, answerUser);
  }

  getQuizLines(): Observable<QuizLine[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/quiz-line`).pipe(
      map((lines) =>
        (lines ?? [])
          // ➜ garde uniquement le quiz id=1 (Type of vacation)
          .filter((line: any) => Number(line?.quiz_id ?? line?.quiz?.id ?? line?.Quiz?.id) === 1)
          // ➜ tri par étape (fallback 0)
          .sort((a: any, b: any) => (a?.step ?? 0) - (b?.step ?? 0))
      )
    );
  }

  getQuizAnswers(): Observable<QuizAnswer[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/quiz-answer-text`).pipe(
      // uniformise le champ texte (answer vs text selon ton backend)
      map((answers) => (answers ?? []).map((a: any) => ({ ...a, answer: a.answer ?? a.text })))
    );
  }

  // getPricingQuizWithAnswers(): Observable<QuizQuestion[]> {
  //   return forkJoin({
  //     lines: this.getQuizLines(),
  //     answers: this.getQuizAnswers()
  //   }).pipe(
  //     map(({ lines, answers }) =>
  //       (lines ?? []).map((line: any) => {
  //         const lineAnswers = (answers ?? []).filter((a: any) => Number(a.quiz_line_id) === Number(line.id));

  //         // fallback Oui/Non si question booléenne sans réponses configurées
  //         const isBoolean = !!line.is_boolean || String(line?.response_kind?.type || '').toLowerCase() === 'boolean';
  //         const finalAnswers =
  //           lineAnswers.length > 0
  //             ? lineAnswers
  //             : isBoolean
  //               ? [
  //                   { id: 1, answer: 'Oui' },
  //                   { id: 0, answer: 'Non' }
  //                 ]
  //               : [];

  //         return {
  //           questionData: line,
  //           answers: finalAnswers
  //         };
  //       })
  //     )
  //   );
  // }
}
