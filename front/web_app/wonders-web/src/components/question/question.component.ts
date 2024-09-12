import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
export class QuestionComponent {
  percent: number = 0;
  currentQuestionIndex: number = 0;
  showResults = false;
  selectedAnswers: string[] = [];

  constructor(private router: Router) {}

  results: any[] = [
    { title: "Londres", class: "londre" },
    { title: "Paris", class: "paris" },
    { title: "Japon", class: "japon" }
  ];

  questions: any[] = [
    {
      title: 'Quel climat préférez-vous ?',
      options: ['Chaud', 'Tempéré', 'Froid', 'Tropical']
    },
    {
      title: 'Quel type de vacances préférez-vous ?',
      options: ['Plage', 'Montagne', 'Ville', 'Campagne']
    },
    {
      title: 'Quel type de transport souhaitez-vous prendre ?',
      options: ['Avion', 'Train', 'Voiture', 'Bateau']
    }
  ];

  showResult() {
    this.showResults = true;
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

  navigateToPlanTrip(destination: string) {
    this.router.navigate(['/planTrip'], { queryParams: { destination: destination } });
  }
}
