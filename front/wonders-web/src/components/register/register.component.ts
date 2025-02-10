import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/User';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  returnUrl: string = '/home'
  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birth_date: new Date(),
    country: '',
    language_id: 1
  }

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    // Il manque la récupération de la liste des pays quand elle sera disponible
  }

  clickRegister(): void {
    this._authService.register(this.user).subscribe({
      next: (data) => {
        this.router.navigate(['login'], { queryParams: { returnUrl: this.returnUrl }});
      }
    })
  }

  href(event: Event): void {
    event.preventDefault();
    this.router.navigate(['login'], { queryParams: { returnUrl: this.returnUrl }});
  }
}
