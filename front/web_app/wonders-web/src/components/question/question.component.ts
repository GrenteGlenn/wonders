import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionnaireService } from '../../app/service/questionnaire/questionnaire.service';
import { QuizQuestion, UserAnswerCreate } from '../../app/model/Question';
import { AuthentificationService } from '../../app/service/auth/authentification.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatProgressBarModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: QuizQuestion[] = [];
  currentQuestionIndex: number = 0;
  showResults = false;
  selectedAnswers: any[] = [];
  userAnswersMap: Map<number, any> = new Map();
  percent: number = 0;
  quizResponseId: number | null = null;
  userAnswers: any[] = [];

  fakeResult = [
    {
      pays: "Norvège",
      img_full: "https://www.norvege-inedite.com/uploads/sites/32/2019/08/adobestock_199048393-1-730x520.jpeg"
    },
    {
      pays: "Suède",
      img_full: "https://static.nationalgeographic.fr/files/styles/image_3200/public/nordics_awl_clkrm45666_hr.webp?w=1600&h=900"
    },
    {
      pays: "Lituanie",
      img_full: "https://www.laquotidienne.fr/wp-content/uploads/2015/05/lituanie.jpg"
    }
  ]


  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private authService: AuthentificationService,
  ) {}

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      // Charge d'abord les questions, puis les réponses
      this.loadQuizQuestions().then(() => {
        // this.loadUserAnswers();
      });
    } else {
      this.loadQuizQuestions();
    }
  }



  loadUserAnswers() {
    this.questionnaireService.getUserAllAnswers().subscribe({
      next: (answers) => {
        console.log('Réponses utilisateur chargées:', answers);
        // Filtre les réponses pour ne garder que celles du quiz actuel
        this.userAnswers = answers.filter((answer: { quiz_line_id: number; }) =>
          this.questions.some(q => q.questionData.id === answer.quiz_line_id)
        );
        this.populateExistingAnswers();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réponses:', error);
      }
    });
  }

  populateExistingAnswers() {
    this.userAnswers.forEach(answer => {
      const questionIndex = this.questions.findIndex(
        q => q.questionData.id === answer.quiz_line_id
      );
      if (questionIndex !== -1) {
        this.selectedAnswers[questionIndex] = answer.text;
        this.userAnswersMap.set(questionIndex, answer);
      }
    });
  }


  loadQuizQuestions() {
    return new Promise<void>((resolve) => {
      this.questionnaireService.getPricingQuizWithAnswers().subscribe({
        next: (questions) => {
          this.questions = questions;
          this.updateProgress();
          this.initializeQuizResponse();
          resolve();
        },
        error: (error) => {
          console.error('Erreur lors du chargement des questions:', error);
          resolve();
        }
      });
    });
  }

  initializeQuizResponse() {
    const quizId = 1; // ID du quiz "Type of vacation"
    this.questionnaireService.createQuizResponse(quizId).subscribe({
      next: (response) => {
        this.quizResponseId = response.id;
        this.loadExistingAnswers();
      },
      error: (error) => {
        console.error('Erreur lors de l\'initialisation du quiz:', error);
      }
    });
  }

  loadExistingAnswers() {
    if (!this.quizResponseId) return;

    this.questionnaireService.getUserAnswers(this.quizResponseId).subscribe({
      next: (answers) => {
        answers.forEach((answer: any) => {
          const questionIndex = this.questions.findIndex(
            q => q.questionData.id === answer.quiz_line_id
          );
          if (questionIndex !== -1) {
            this.selectedAnswers[questionIndex] = answer.text;
            this.userAnswersMap.set(questionIndex, answer);
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réponses existantes:', error);
      }
    });
  }

   saveOrUpdateAnswer() {
    if (!this.selectedAnswers[this.currentQuestionIndex] || !this.quizResponseId) return;

    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(
      answer => answer.answer === this.selectedAnswers[this.currentQuestionIndex]
    );

    if (!selectedAnswer) return;

    const answerData: Partial<UserAnswerCreate> = {
      quiz_answer_text_id: Number(selectedAnswer.id),
      quiz_line_id: Number(currentQuestion.questionData.id),
      quiz_response_id: Number(this.quizResponseId),
      boolean: true,
      text: selectedAnswer.answer
    };

    // Vérifier si une réponse existe pour cette question spécifique
    const existingAnswer = this.userAnswers.find(
      answer => answer.quiz_line_id === currentQuestion.questionData.id
    );

    if (existingAnswer) {
      console.log('Mise à jour de la réponse existante ID:', existingAnswer.id);
      this.questionnaireService.updateUserAnswer(existingAnswer.id, answerData).subscribe({
        next: (response) => {
          // Met à jour à la fois userAnswers et userAnswersMap
          const index = this.userAnswers.findIndex(a => a.id === existingAnswer.id);
          if (index !== -1) {
            this.userAnswers[index] = response;
            this.userAnswersMap.set(this.currentQuestionIndex, response);
          }
        },
        error: (error) => console.error('Erreur mise à jour:', error)
      });
    } else {
      this.questionnaireService.saveUserAnswer(answerData).subscribe({
        next: (response) => {
          // Ajoute la nouvelle réponse aux deux collections
          this.userAnswers.push(response);
          this.userAnswersMap.set(this.currentQuestionIndex, response);
        },
        error: (error) => console.error('Erreur sauvegarde:', error)
      });
    }
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updateProgress();
      // Restaure la réponse précédente si elle existe
      const existingAnswer = this.userAnswersMap.get(this.currentQuestionIndex);
      if (existingAnswer) {
        this.selectedAnswers[this.currentQuestionIndex] = existingAnswer.text;
      }
    }
  }


  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.saveOrUpdateAnswer();
      this.currentQuestionIndex++;
      this.updateProgress();
    }
  }

  showResult() {
    this.saveOrUpdateAnswer();
    this.showResults = true;
  }


  updateProgress() {
    this.percent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

 onAnswerSelected(answer: string, question: QuizQuestion) {
    this.selectedAnswers[this.currentQuestionIndex] = answer;
  }

  navigateToPlanTrip(destination: string) {
    this.router.navigate(['/planTrip'], { queryParams: { destination: destination } });
  }
}
