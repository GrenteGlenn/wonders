import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/User';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { FormsModule, NgForm } from '@angular/forms';
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
  returnUrl = '';
  countries: Country[] = [];
  languages: any[] = [];
  passwordErrors: string[] = [];
  emailServerError: string | null = null;
  generalError: string | null = null;
  submitting = false;
  todayISO = new Date().toISOString().slice(0, 10);
  minBirthISO = '1900-01-01';
  birthDateStr = '';

  user: User = {
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    role_id: 1,
    birth_date: null as any,
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
      next: (data) => (this.countries = data),
      error: () => (this.generalError = 'Erreur lors du chargement des pays.')
    });

    this._languagesService.getAllLanguages().subscribe({
      next: (data) => (this.languages = data),
      error: () => (this.generalError = 'Erreur lors du chargement des langues.')
    });
  }

  onCountryChange(event: any): void {
    const selectedCountry = this.countries.find((country) => country.id === +event.target.value);
    this.user.country_id = selectedCountry ? selectedCountry.id : 0;
  }

  // complexité du mot de passe
  validatePassword(): void {
    const pwd = this.user.password || '';
    const errs: string[] = [];
    if (!/[a-z]/.test(pwd)) errs.push('Au moins une minuscule.');
    if (!/[A-Z]/.test(pwd)) errs.push('Au moins une majuscule.');
    if (!/[0-9]/.test(pwd)) errs.push('Au moins un chiffre.');
    if (!/[^\w\s]/.test(pwd)) errs.push('Au moins un caractère spécial.');
    if (pwd.length < 8) errs.push('Au moins 8 caractères.');
    this.passwordErrors = errs;
  }

 clickRegister(f: NgForm): void {
    this.emailServerError = null;
    this.generalError = null;

    if (f?.invalid || this.passwordErrors.length > 0) {
      if (f?.controls) Object.values(f.controls).forEach((c: any) => c.control?.markAsTouched?.());
      return;
    }

    if (!this.birthDateStr ||
        this.birthDateStr < this.minBirthISO ||
        this.birthDateStr > this.todayISO) {
      this.generalError = "Date d'anniversaire invalide.";
      return;
    }

    const payload: User = {
      ...this.user,
      birth_date: new Date(this.birthDateStr) as any
    };

    this.submitting = true;
    this._authService.register(payload).subscribe({
      next: (data: any) => {
        if (data && typeof data === 'object' && ('user' in data || data?.message === 'client created successfully.')) {
          this.router.navigate(['/', this.translateService.currentLang, 'login'], {
            queryParams: { returnUrl: this.returnUrl }
          });
        } else if (typeof data === 'string') {
          this.generalError = data;
        } else {
          this.generalError = 'Une erreur est survenue. Réessayez.';
        }
        this.submitting = false;
      },
      error: (error) => {
        this.submitting = false;
        const raw = (error?.error ?? '').toString();
        const msg = raw.toLowerCase();
        if (error.status === 403 && (msg.includes('already') || msg.includes('registered'))) {
          this.emailServerError = 'Un compte existe déjà avec cet email.';
        } else if (error.status === 400 || msg.includes('password') || msg.includes('weak')) {
          this.generalError = raw || 'Mot de passe trop faible.';
        } else {
          this.generalError = 'Impossible de finaliser l’inscription. Réessayez.';
        }
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
