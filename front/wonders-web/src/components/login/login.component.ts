import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService, ReponseToken } from '../../app/service/auth/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateService } from '../../app/service/translate/translate.service';
import { CommonModule } from '@angular/common';
import { platform } from '@tauri-apps/plugin-os';
import { isTauri } from '../../utils/tauri.utils';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  returnUrl: string = '';
  platformName: string | null = null;
  error: boolean = false
  errorMessage: string = 'Une erreur est survenue'

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    // 🔐 Redirection si déjà connecté
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['/', this.translateService.currentLang, 'home']);
      return;
    }

    this.email = '';
    this.password = '';

    // const rawReturnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    this.returnUrl = `/${this.translateService.currentLang}/home`;

    if (isTauri()) {
      this.platformName = platform();
    }
  }

  detectPlatform(): boolean {
    return ['ios', 'android', 'linux'].includes(this.platformName ?? '');
  }

  clickLogin(): void {
    if (!this.email || !this.password) return;

    this._authService.login(this.email, this.password).subscribe({
      next: (data: ReponseToken) => {
        if (data.success) {
          console.log(data, 'Connexion réussie');
          
          this._authService.setAuthenticated(data.data.token);
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (error) => {
        this.error = true
        console.error('Error while loging:', error)
        this.router.navigate(['/', this.translateService.currentLang, 'login'])
      }
    });
  }

  goToSafe() {
    this.router.navigate(['/fr/secure-safe']);
  }

  href(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/', this.translateService.currentLang, 'register'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }
}
