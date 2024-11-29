import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService, ReponseToken } from '../../app/service/auth/authentification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthentificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, le rediriger vers la page d'accueil
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
    this.email = '';
    this.password = '';
  }

  clickLogin(): void {
    this._authService.login(this.email, this.password).subscribe({
      next: (data: ReponseToken) => {
        if (data.success) {
          // Utiliser la nouvelle méthode setAuthenticated du service
          this._authService.setAuthenticated(data.data.token);
          // Rediriger vers la page d'accueil après connexion réussie
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        // Gérer les erreurs de connexion ici
        console.error('Erreur de connexion:', error);
        // Vous pouvez ajouter un message d'erreur pour l'utilisateur
      }
    });
  }
}