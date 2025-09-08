import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
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
  styleUrls: ['./login.component.css'] // (styleUrl -> styleUrls si besoin)
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  returnUrl = '';
  platformName: string | null = null;

  submitting = false;
  authError: string | null = null; // Erreur d'authentification (serveur)

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['/', this.translateService.currentLang, 'home']);
      return;
    }

    this.returnUrl = `/${this.translateService.currentLang}/home`;

    if (isTauri()) {
      this.platformName = platform();
    }
  }

  detectPlatform(): boolean {
    return ['ios', 'android', 'linux'].includes(this.platformName ?? '');
  }

  clickLogin(form: NgForm): void {
    // Nettoie le message d'erreur serveur
    this.authError = null;

    // Si le formulaire est invalide, on marque les champs et on stoppe
    if (form.invalid) {
      Object.values(form.controls).forEach(c => c.markAsTouched());
      return;
    }

    this.submitting = true;

    this._authService.login(this.email, this.password).subscribe({
      next: (data: ReponseToken) => {
        this.submitting = false;
        if (data.success) {
          this._authService.setAuthenticated(data.data.token);
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.authError = 'Échec de la connexion.';
        }
      },
      error: (error) => {
        console.error('Error while logging in:', error);
        this.submitting = false;
        this.authError = 'Identifiants invalides ou erreur serveur.';
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
