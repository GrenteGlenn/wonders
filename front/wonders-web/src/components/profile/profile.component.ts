import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
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
import { AvatarsService } from '../../app/service/users/avatars.service';
import { TripService } from '../../app/service/trip/trip.service';
import { ActivityService } from '../../app/service/activity/activity.service';
import { CityService } from '../../app/service/city/city.service';
import { TranslateService } from '../../app/service/translate/translate.service';

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
  newUser = { first_name: '', last_name: '', email: '', img: '' };

  languageName: string = '';
  countryName: string = '';
  showEditModal = false;
  showTripInfoModal = false;
  showDeleteModal = false;
  userAvatar: string = '';
  genericAvatar: string = 'https://github.com/shadcn.png';
  trips: any[] = [];
  selectedTrip: any = null;
  categoryMap: Record<number, string> = {};
  citiesName: Record<number, string> = {};
  isLoadingTrips = false;
  hasTrips: boolean | null = null;

  constructor(
    private usersService: UsersService,
    private languageService: LanguageService,
    private countryService: CountryService,
    protected avatarsService: AvatarsService,
    public getUserFullTrip: TripService,
    private activityService: ActivityService,
    private citiesService: CityService,
    public router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    // const avatars = this.avatarsService.getAvatars();
  }

  getActivityCategoryName(activityId: number): string {
    return this.categoryMap[activityId] || 'Catégorie inconnue';
  }

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
        if (this.user?.id) {
          this.loadUserTrips(this.user.id);
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des informations utilisateur:', error);
      }
    });
  }
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
        email: this.user.email || '',
        img: this.user.img || ''
      };
    }
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  openTripInfoModal(trip: any) {
    const activityId = trip?.cities?.[0]?.tripCityDays?.[0]?.activities?.[0]?.activity_id;
    const cityId = trip?.cities?.[0]?.city_id;

    if (activityId) {
      this.loadActivityCategory(activityId);
    }

    if (cityId) {
      this.loadCitiesName(cityId);
    }

    this.selectedTrip = {
      ...trip,
      countryImage: trip.country?.image || 'assets/images/noimages.jpg',
      from_date: new Date(trip.from_date),
      to_date: new Date(trip.to_date)
    };

    this.showTripInfoModal = true;
  }

  closeTripInfoModal() {
    this.showTripInfoModal = false;
    this.selectedTrip = null;
  }
  submitEdit() {
    if (!this.user) return;

    this.usersService.Edit(this.user, this.newUser).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadUserInfo();
      },
      error: (err) => {
        console.error('Error occured while updating user profile :', err);
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

  goPlanTrip() {
    this.router.navigate(['/', this.translateService.currentLang, 'stepBody']);
  }

  loadUserTrips(userId: number) {
    this.isLoadingTrips = true;
    this.hasTrips = null;

    this.getUserFullTrip.getUserFullTrip(userId).subscribe({
      next: (data) => {
        const tripsArray = Array.isArray(data) ? data : data ? [data] : [];
        if (tripsArray.length === 0) {
          this.trips = [];
          this.hasTrips = false;
          this.isLoadingTrips = false;
          return;
        }

        this.trips = [];
        this.hasTrips = true;
        this.isLoadingTrips = false;

        tripsArray.forEach((trip) => {
          if (!trip) return;

          this.countryService.getCountryById(trip.country_id).subscribe({
            next: (country) => {
              this.trips.push({
                ...trip,
                country,
                countryImage: country?.image || 'assets/images/noimages.jpg'
              });
            },
            error: () => {
              this.trips.push({
                ...trip,
                country: null,
                countryImage: 'assets/images/noimages.jpg'
              });
            }
          });
        });
      },
      error: () => {
        this.trips = [];
        this.hasTrips = false;
        this.isLoadingTrips = false;
      }
    });
  }

  loadActivityCategory(activityId: number): void {
    if (this.categoryMap[activityId]) return;

    this.activityService.getCategoryById(activityId).subscribe({
      next: (activity_categories) => {
        this.categoryMap[activityId] = activity_categories.name || 'Inconnue';
      },
      error: () => {
        this.categoryMap[activityId] = 'Inconnue';
      }
    });
  }

  @ViewChild('carouselRef', { static: false }) carouselRef!: ElementRef;

  scrollCarousel(direction: 'left' | 'right') {
    const carousel = this.carouselRef.nativeElement as HTMLElement;
    const scrollAmount = 300;

    if (direction === 'left') {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }

  getCityName(cityId: number): string {
    return this.citiesName[cityId] || 'Ville inconnue';
  }

  loadCitiesName(id: number): void {
    this.citiesService.getCityById(id).subscribe({
      next: (cities) => {
        this.citiesName[id] = cities.name || 'Inconnue';
      },
      error: () => {
        this.citiesName[id] = 'Inconnue';
      }
    });
  }
}
