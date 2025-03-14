import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionnaireService } from '../../app/service/questionnaire/questionnaire.service';
import { QuizQuestion, UserAnswerCreate } from '../../app/model/Question';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { AIProposalCountry, AIQuizzCountry } from '../../app/model/AI';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [LucideAngularModule, MatProgressBarModule, CommonModule, FormsModule],
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
  proposalCountries: AIProposalCountry[] = [];
  isProposalLoading: boolean = true;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService,
    private authService: AuthentificationService
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

  // permet le switche de vers la page plan trip avec la suggestion
  onSelectProposal(suggestion: any) {
    this.router.navigate(['/planTrip'], {
      queryParams: {
        image: suggestion.img_full,
        city: suggestion.pays
      }
    });
  }

  loadUserAnswers() {
    this.questionnaireService.getUserAllAnswers().subscribe({
      next: (answers) => {
        console.log('Réponses utilisateur chargées:', answers);
        // Filtre les réponses pour ne garder que celles du quiz actuel
        this.userAnswers = answers.filter((answer: { quiz_line_id: number }) =>
          this.questions.some((q) => q.questionData.id === answer.quiz_line_id)
        );
        this.populateExistingAnswers();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réponses:', error);
      }
    });
  }

  populateExistingAnswers() {
    this.userAnswers.forEach((answer) => {
      const questionIndex = this.questions.findIndex((q) => q.questionData.id === answer.quiz_line_id);
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
        console.error("Erreur lors de l'initialisation du quiz:", error);
      }
    });
  }

  loadExistingAnswers() {
    if (!this.quizResponseId) return;

    this.questionnaireService.getUserAnswers(this.quizResponseId).subscribe({
      next: (answers) => {
        answers.forEach((answer: any) => {
          const questionIndex = this.questions.findIndex((q) => q.questionData.id === answer.quiz_line_id);
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
    console.log('Question actuelle:', currentQuestion); // Debug

    const selectedAnswer = currentQuestion.answers.find(
      (answer) => answer.answer === this.selectedAnswers[this.currentQuestionIndex]
    );
    console.log('Réponse sélectionnée:', selectedAnswer); // Debug

    if (!selectedAnswer) return;

    const answerData: Partial<UserAnswerCreate> = {
      quiz_answer_text_id: Number(selectedAnswer.id),
      quiz_line_id: Number(currentQuestion.questionData.id),
      quiz_response_id: Number(this.quizResponseId),
      boolean: true,
      text: selectedAnswer.answer
    };

    // Sauvegarder directement dans userAnswers
    const newAnswer = {
      ...answerData,
      id: Date.now(), // ID temporaire pour les nouvelles réponses
      text: selectedAnswer.answer,
      quiz_line_id: currentQuestion.questionData.id
    };

    // Mettre à jour ou ajouter la réponse localement
    const existingIndex = this.userAnswers.findIndex(
      (answer) => answer.quiz_line_id === currentQuestion.questionData.id
    );

    if (existingIndex !== -1) {
      this.userAnswers[existingIndex] = newAnswer;
    } else {
      this.userAnswers.push(newAnswer);
    }

    console.log('userAnswers mis à jour:', this.userAnswers); // Debug

    // Continuer avec la sauvegarde API comme avant
    const existingAnswer = this.userAnswers.find((answer) => answer.quiz_line_id === currentQuestion.questionData.id);

    if (existingAnswer && existingAnswer.id) {
      this.questionnaireService.updateUserAnswer(existingAnswer.id, answerData).subscribe({
        next: (response) => {
          console.log('Réponse mise à jour avec succès:', response);
        },
        error: (error) => console.error('Erreur mise à jour:', error)
      });
    } else {
      this.questionnaireService.saveUserAnswer(answerData).subscribe({
        next: (response) => {
          console.log('Nouvelle réponse sauvegardée avec succès:', response);
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
    this.askProposalCountry();
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

  askProposalCountry() {
    const answerUser: AIQuizzCountry = {
      langue: [],
      climat: '',
      paysage: '',
      activity: [],
      populaire: false
    };

    this.userAnswers.forEach((answer) => {
      switch (answer.quiz_line_id) {
        case 10: // Question langue
          if (answer.text.toLowerCase().includes('non')) {
            answerUser.langue = ['français'];
          } else {
            answerUser.langue = ['français', 'anglais'];
          }
          break;

        case 11: // Question climat
          answerUser.climat = answer.text.toLowerCase();
          // console.log( answerUser.climat, 'climat');
          break;

        case 15: // Question activité
          answerUser.activity = [answer.text.toLowerCase()];
          // console.log(answerUser.activity, 'activité');
          break;

        case 19: // Question paysage
          answerUser.paysage = answer.text.toLowerCase();
          // console.log( answerUser.paysage, 'paysage');

          break;
      }
    });
    this.questionnaireService.getAIProposition(answerUser).subscribe({
      next: (suggestion) => {
        for (let i = 0; i < 3; i++) {
          this.proposalCountries[i] = suggestion.data[i];
        }
        this.isProposalLoading = false;
        console.log('Suggestion:', suggestion);
        console.log('Proposal:', this.proposalCountries);
      },
      error: (error) => {
        console.log('Erreur lors de la récupération des propositions de pays');
        console.log(error);
      }
    });
  }
}
