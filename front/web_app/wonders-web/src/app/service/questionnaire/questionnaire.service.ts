import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../../model/countries';
import { QuizAnswer, QuizLine, QuizQuestion } from '../../model/Question';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private apiUrl = environment.quizzApiUrl;
  
  constructor(
    private http: HttpClient
  ) { }

  //Obtenir les countries
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.apiUrl}/api/countries`);
  }

  getQuizLines(): Observable<QuizLine[]> {
    return this.http.get<QuizLine[]>(`${this.apiUrl}/api/quiz-line`).pipe(
      map(lines => lines.filter(line => line.quiz.name === 'Type of vacation')
          .sort((a, b) => a.step - b.step))
    );
  }

  getQuizAnswers(): Observable<QuizAnswer[]> {
    return this.http.get<QuizAnswer[]>(`${this.apiUrl}/api/quiz-answer-text`);
  }

  getPricingQuizWithAnswers(): Observable<QuizQuestion[]> {
    return forkJoin({
      lines: this.getQuizLines(),
      answers: this.getQuizAnswers()
    }).pipe(
      map(({ lines, answers }) => {
        return lines.map(line => ({
          questionData: line,
          answers: answers.filter(answer => answer.quiz_line_id === line.id)
        }));
      })
    );
  }

}
