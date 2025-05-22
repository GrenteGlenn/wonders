import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateService } from '../../app/service/translate/translate.service';

@Component({
  selector: 'app-choice-guide',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './choice-guide.component.html',
  styleUrl: './choice-guide.component.css'
})
export class ChoiceGuideComponent {
  constructor(
    public router: Router,
    public translateService: TranslateService
  ) {}

  goQuestion() {
    this.router.navigate(['/', this.translateService.currentLang, 'question']);
  }

  goPlanTrip() {
    this.router.navigate(['/', this.translateService.currentLang, 'stepBody']);
  }
}
