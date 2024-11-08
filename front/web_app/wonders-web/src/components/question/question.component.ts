// components/question/question.component.ts

import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuestionnaireService } from '../../app/service/questionnaire/questionnaire.service';
import { QuizQuestion } from '../../app/model/Question';



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
  selectedAnswers: string[] = [];
  percent: number = 0;

  constructor(
    private router: Router,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit() {
    this.loadQuizQuestions();
  }

  loadQuizQuestions() {
    this.questionnaireService.getPricingQuizWithAnswers().subscribe({
      next: (questions) => {
        this.questions = questions;
        this.updateProgress();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des questions:', error);
      }
    });
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.updateProgress();
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.updateProgress();
    }
  }

  updateProgress() {
    this.percent = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  showResult() {
    this.showResults = true;
  }

  navigateToPlanTrip(destination: string) {
    this.router.navigate(['/planTrip'], { queryParams: { destination: destination } });
  }
}