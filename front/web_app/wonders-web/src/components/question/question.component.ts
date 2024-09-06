import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatProgressBarModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {

  percent: number = 0;
  currentQuestionIndex: number = 0;
}
