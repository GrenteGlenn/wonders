import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/User';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../app/service/country/country.service';
import { NgFor, NgIf } from '@angular/common';
import { LanguageService } from '../../app/service/languages/languages.service';
import { Country } from '../activities/activities/activities.component';
import { TranslateService } from '../../app/service/translate/translate.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  returnUrl: string = '';
  countries: Country[] = [];
  languages: any[] = [];
  error: boolean = false
  errorMessage: string = 'Une erreur est survenue'

  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: 1,
    birth_date: new Date(),
    country_id: 0,
    language_id: 1
  };

  constructor(
    private _authService: AuthentificationService,
    private route: ActivatedRoute,
    private _countryService: CountryService,
    private _languagesService: LanguageService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    const rawReturnUrl = this.route.snapshot.queryParams['returnUrl'] || 'home';
    this.returnUrl = `/${this.translateService.currentLang}/${rawReturnUrl}`;

    this.loadData();
  }

  loadData(): void {
    this._countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des pays:', error);
      }
    });

    this._languagesService.getAllLanguages().subscribe({
      next: (data) => {
        this.languages = data;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des langues:', error);
      }
    });
  }

  onCountryChange(event: any): void {
    const selectedCountry = this.countries.find((country) => country.id === +event.target.value);
    if (selectedCountry) {
      this.user.country_id = selectedCountry.id;
    }
  }

  clickRegister(): void {
    this._authService.register(this.user).subscribe({
      next: (data) => {
        this.router.navigate(['/', this.translateService.currentLang, 'login'], {
          queryParams: { returnUrl: this.returnUrl }
        });
      },
      error: (error) => {
        this.error = true
      }
    });
  }

  href(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/', this.translateService.currentLang, 'login'], {
      queryParams: { returnUrl: this.returnUrl }
    });
  }
}
