import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-choice-guide',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './choice-guide.component.html',
  styleUrl: './choice-guide.component.css'
})
export class ChoiceGuideComponent {
  constructor(public router: Router) {}

  goQuestion() {
    this.router.navigate(['question']);
  }

  goPlanTrip() {
    this.router.navigate(['stepBody']);
  }
}
