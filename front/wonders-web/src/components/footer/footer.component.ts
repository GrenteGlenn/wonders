import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RetourBugComponent } from "../retourBug/retour-bug/retour-bug.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslateModule, RetourBugComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  constructor(
    private router: Router,
    public translateService: TranslateService
  ) {}

  goToPrivacyPolicy() {
    this.router.navigate([ this.translateService.currentLang, 'privacy-policy']);
  }
  goToTermsOfService() {
    this.router.navigate([ this.translateService.currentLang, 'terms-of-service']);
  }
}
