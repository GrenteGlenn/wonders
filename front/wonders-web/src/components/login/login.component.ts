import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService, ReponseToken } from '../../app/service/auth/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { TranslateService } from '../../app/service/translate/translate.service';
import { platform } from '@tauri-apps/plugin-os';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

const currentPlatform = platform();

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, LucideAngularModule, CommonModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css' 
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  returnUrl: string = '';

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router,
    public translateService: TranslateService 
  ) {}
  
  detectPlatform(): boolean {
    return ['ios', 'android', 'linux'].includes(currentPlatform);
  }
  
  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['/', this.translateService.currentLang, 'home']);
      return;
    }

    this.email = '';
    this.password = '';

    const rawReturnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    this.returnUrl = `/${this.translateService.currentLang}/${rawReturnUrl}`;
  }

  clickLogin(): void {
    if (!this.email || !this.password) return;

    this._authService.login(this.email, this.password).subscribe({
      next: (data: ReponseToken) => {
        if (data.success) {
          this._authService.setAuthenticated(data.data.token);
          this.router.navigateByUrl(this.returnUrl);
        }
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
      }
    });
  }

  goToSafe() {
    this.router.navigate(['/fr/secure-safe']);
  }

  href(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/', this.translateService.currentLang, 'register'], { queryParams: { returnUrl: this.returnUrl } });
  }
}
