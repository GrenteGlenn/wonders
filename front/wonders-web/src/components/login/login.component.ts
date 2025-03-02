import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService, ReponseToken } from '../../app/service/auth/authentification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    LucideAngularModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  returnUrl: string = '/home';

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Si l'utilisateur est déjà connecté, le rediriger vers la page d'accueil
    if (this._authService.isAuthenticated()) {
      this.router.navigate(['home']);
    }
    this.email = '';
    this.password = '';
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  }

  // Pour l'instant aucune vérification n'est mis en place.
  // Simplement envoyer les informations
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
        // Gérer les erreurs de connexion ici
        console.error('Erreur de connexion:', error);
        // Vous pouvez ajouter un message d'erreur pour l'utilisateur
      }
    });
  }

  href(event: Event): void {
    event.preventDefault();
    this.router.navigate(['register'], { queryParams: { returnUrl: this.returnUrl }});
  }
}
