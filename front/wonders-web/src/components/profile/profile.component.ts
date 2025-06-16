import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { FetchableUser, User } from '../../app/model/User';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { UsersService } from '../../app/service/users/users.service';
import { LanguageService } from '../../app/service/languages/languages.service';
import { CountryService } from '../../app/service/country/country.service';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


interface r {
  image: string;
  city: string;
  date: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LucideAngularModule, MatCardModule, CommonModule, DialogModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileComponent implements OnInit {
  dialog = inject(Dialog);

  user: FetchableUser | null = null;
  newUser = { first_name: "", last_name: "", email: "" }

  languageName: string = '';
  countryName: string = '';

  showEditModal = false;
  showDeleteModal = false;

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
  loadUserInfo() {
    this.usersService.getUserInfo().subscribe({
      next: (userData) => {
        this.user = userData;

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

  // modal

  openEditModal() {
     if (this.user) {
      this.newUser = {
        first_name: this.user.first_name || '',
        last_name: this.user.last_name || '',
        email: this.user.email || ''
    };
  }
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  submitEdit() {
    if (!this.user) return;
  
    this.usersService.Edit(this.user, this.newUser).subscribe({
      next: () => {
        this.closeEditModal();
        console.log('Profil mis à jour avec succès');
        // Optionnel : tu peux afficher un toast ou notifier l'utilisateur ici
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du profil :', err);
      }
    });
  }
  
  openDeleteModal() {
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  confirmDelete() {
    // service à implémenter
    this.closeDeleteModal();
  }
}
