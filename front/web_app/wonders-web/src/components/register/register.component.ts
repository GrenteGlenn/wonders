import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/User';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birth_date: new Date(),
    country: '',
    language_id: 1
  }

  constructor(private _authService: AuthentificationService) {}

  ngOnInit(): void {
    // Il manque la récupération de la liste des pays quand elle sera disponible
  }

  clickRegister(): void {
    this._authService.register(this.user).subscribe({
      next: (data) => {
        console.log('REMOVE ME, user created');
      }
    })
  }
}
