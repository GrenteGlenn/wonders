import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/User';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country } from '../modals/modal-activity/modal-activity.component';
import { CountryService } from '../../app/service/country/country.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  returnUrl: string = '/home';
  countries: Country[] = [];
  selectedCountryId: any = 0;


  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birth_date: new Date(),
    country_id: 0,
    language_id: 0
  }

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private _countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.loadCountries();
  }


  loadCountries(): void {
    this._countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des pays:', error);
      }
    });
  }

  onCountryChange(event: any): void {
    const selectedCountry = this.countries.find(country => country.id === +event.target.value);
    if (selectedCountry) {
      this.user.country = selectedCountry.id;
      // this.user.language_id = selectedCountry.id;
    }
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
