import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { User } from '../../app/model/User';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { UsersService } from '../../app/service/users/users.service';
import { LanguageService } from '../../app/service/languages/languages.service';
import { CountryService } from '../../app/service/country/country.service';

interface r {
  image: string;
  city: string;
  date: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LucideAngularModule, MatCardModule, CommonModule, DialogModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  dialog = inject(Dialog);

  user: User | null = null;
  languageName: string = '';
  countryName: string = '';


  constructor(
    // private router: Router,
    // private _authService: AuthentificationService,
    private usersService: UsersService,
    private languageService: LanguageService,
    private countryService: CountryService

  ) {}

  ngOnInit(): void {
    // this._authService.isAuthenticated$.subscribe(
    //   isAuth => this.isAuthenticated = isAuth
    // );

    this.loadUserInfo();
  }

  history: r[] = [
    {
      image: 'history1.png',
      city: 'Austin, TX',
      date: '2022'
    },
    {
      image: 'history2.png',
      city: 'Los Angeles, CA',
      date: '2021'
    },
    {
      image: 'history3.png',
      city: 'Maui, HI',
      date: '2021'
    },
    {
      image: 'history4.png',
      city: 'Reno, NV',
      date: '2019'
    }
  ];

  destination: r[] = [
    {
      image: 'history3.png',
      city: 'Maui, Hawaii',
      date: 'Hawaii'
    },
    {
      image: 'history5.png',
      city: 'Bora Bora, French Polynesia',
      date: 'French Polynesia'
    },
    {
      image: 'history6.png',
      city: 'Aspen, Colorado',
      date: 'Colorado'
    },
    {
      image: 'history7.png',
      city: 'Kyoto, Japan',
      date: 'Japan'
    }
  ];

  confirmDelete(): void {
    //  modale à placer ici
  }

  loadUserInfo() {
    this.usersService.getUserInfo().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(this.user, 'users');
        
        if (this.user && this.user.language_id) {
          this.loadLanguageName(this.user.language_id);
        }
        if (this.user && this.user.country_id) {
          this.loadCountryName(this.user.country_id);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des informations utilisateur:', error);
      }
    });
  }

  // Charge le nom de la langue de l'user en fonction de l'id de ce dernier
  loadLanguageName(languageId: number) {
    this.languageService.getLanguageById(languageId).subscribe({
      next: (language) => {
        this.languageName = language.name;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la langue:', error);
        this.languageName = 'Langue non disponible';
      }
    });
  }
  // Charge le nom du pays de l'user en fonction de l'id de ce dernier
  loadCountryName(countryId: number) {
    this.countryService.getCountryById(countryId).subscribe({
      next: (country) => {
        this.countryName = country.name;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du pays:', error);
        this.countryName = 'Pays non disponible';
      }
    });
  }
}
