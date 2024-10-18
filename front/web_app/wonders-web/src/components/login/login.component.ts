import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

  constructor(private _authService: AuthentificationService) {

  }

  ngOnInit(): void {
    this.email = '';
    this.password = '';
  }

  // Pour l'instant aucune vérification n'est mis en place.
  // Simplement envoyer les informations
  // Aucune redirection n'est effectué
  clickLogin(): void {
    this._authService.login(this.email, this.password).subscribe({
      next: (data: ReponseToken) => {
        localStorage.setItem('UserToken', data.data.token);
        this._authService.userSubject.next(data.data.token);
      }
    })
  }
}
