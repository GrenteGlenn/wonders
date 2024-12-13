import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { LucideAngularModule, ChevronsLeft } from 'lucide-angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    LucideAngularModule


   ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  encapsulation: ViewEncapsulation.None

})
export class LandingPageComponent {
  showDetails = false;
  showResults = false;
  

  
  constructor(private router: Router) {}
  goToSite() {
    this.router.navigate(['/site']); 
  }
  showQuestionnaire() {
    this.showDetails = true;
  }

  showResult() {
    this.showResults = true;
  }
  percent: number = 0;
  currentQuestionIndex: number = 0;
  questions: any[] = [
    {
      title: 'Quel climat vous préférez ?',
      options: [
        { text: 'Climat chaud', class: 'climatchaud' },
        { text: 'Climat froid',  class: 'climatfroid' },
        { text: 'Climat tempéré', class: 'climattemperer' }
      ]
    },
    {
      title: 'Quel type de vacances préférez-vous ?',
      options: [
        { text: 'Vacances à la plage',  class: 'vacancesPlage' },
        { text: 'Vacances à la montagne', class: 'vacancesMontagne' },
        { text: 'Vacances en ville',  class: 'vacancesVille' }
      ]
    },
    {
      title: 'Quel type de transport vous souhaitez prendre ?',
      options: [
        { text: 'Avion',  class: 'avion' },
        { text: 'Train', class: 'train' },
        { text: 'Voiture',  class: 'voiture' }
      ]
    }
  ];

  updateProgress() {
    this.percent += 10;
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
    } if (this.percent === 100) {
      this.showResults = true;
      console.log('Vous avez terminé le quiz!');
    }
  }

  refresh(): void {
    window.location.reload();
  }

  previousQuestion() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.percent -= 10;
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.percent += 10;
    }
  }
}