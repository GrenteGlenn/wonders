import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../app/service/toast/toast.service';
import { CountryService } from '../../../app/service/country/country.service';
import { FormsModule } from '@angular/forms';
import { DestinationsComponent } from '../../destinations/destinations.component';
import { ActivitiesComponent } from '../../activities/activities/activities.component';
import { FlyComponent } from '../../fly/fly/fly.component';
import { HotelComponent } from '../../hotel/hotel.component';
import { Destination } from '../../../app/model/destination';
import { PreviewComponent } from '../../preview/preview.component';
import { RequirementsComponent } from '../../requirements/requirements.component';
import { FullTrip, TripService } from '../../../app/service/trip/trip.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../../app/service/translate/translate.service';
import { UsersService } from '../../../app/service/users/users.service';
import { Country } from '../../../app/model/Country';
import { identity } from 'rxjs';

@Component({
  selector: 'app-step-body',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DestinationsComponent,
    ActivitiesComponent,
    FlyComponent,
    HotelComponent,
    PreviewComponent,
    RequirementsComponent
  ],
  templateUrl: './step-body.component.html',
  styleUrl: './step-body.component.css'
})
export class StepBodyComponent {
  steps = ['Pays', 'Activités', 'Vols', 'Hotel', 'Résumé'];
  currentStep = 1;

  private toastService = inject(ToastService);
  private tripService = inject(TripService);

  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';
  isModalOpen = false;
  isLoading = false;
  isSubmitting = false;
  isSubmitting = false;

  //stock les données pour l'étape 5

  selectedDestination: Destination | null = null;
  selectedActivity: any = null;
  selectedFlight: any = null;
  selectedHotel: any = null;
  selectedUser: any = null;

  destinationParams: { [key: string]: string } = {};

  constructor(
    private countryService: CountryService,
    private router: Router,
    public translateService: TranslateService,
    private user: UsersService
  ) {}

  handleDestinationSelected(destination: Destination) {
    // this.selectedDestination = destination;
    this.selectedDestination = {
      id: destination.id,
      name: destination.name,
      image: destination.image,
      description: destination.description,
      type: 'country',
      latitude: destination.latitude,
      longitude: destination.longitude
    };
    console.log(' Destination reçue 1 :', destination);
  }
  handleActivitySelected(activity: any) {
    this.selectedActivity = {
      id: activity.category.id,
      category: activity.category,
      name: activity.name,
      description: activity.description,
      image: activity.image,
      latitude: activity.latitude,
      longitude: activity.longitude
    };

    console.log(' Activité reçue 556 :', activity);
  }
  handleFlightSelected(flight: any) {
    this.selectedFlight = flight;
    // console.log(' Vol reçu :', flight);
  }

  handleHotelSelected(hotel: any) {
    this.selectedHotel = hotel;
    // console.log(' Hôtel reçu :', hotel);
  }

  // Fonction pour valider les étapes en fonction des requirements
  canProceedToNextStep(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.selectedDestination;
      case 2:
        return !!(this.selectedActivity?.category && this.selectedActivity?.name);
      case 3:
        return !!this.selectedFlight;
      case 4:
        return !!this.selectedHotel?.name;
      default:
        return true;
    }
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;

      if (this.currentStep === 4) {
        console.log('--- Informations accumulées avant Hôtel ---');
        console.log('Destination :', this.selectedDestination);
        console.log('Activité :', this.selectedActivity.category.id);
        console.log('Vol :', this.selectedFlight);
      }
      if (this.currentStep === 5) {
        console.log("📦 Résumé complet des données à l'étape 5 :");
        console.log({
          destination: this.selectedDestination,
          activity: this.selectedActivity,
          flight: this.selectedFlight,
          hotel: this.selectedHotel
        });
      }
      this.toastService.success(`Données sauvegardées avec succès !`);
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  ngOnInit() {
    this.loadCountries();
  }

  submitTrip() {
    if (!this.selectedDestination || !this.selectedActivity || !this.selectedFlight || !this.selectedHotel) {
      this.toastService.error('Certains éléments du voyage sont manquants.');
      return;
    }

    const activityId = this.selectedActivity?.id;

    if (!activityId) {
      this.toastService.error('Aucune activité sélectionnée.');
      return;
    }

    this.user.getUserInfo().subscribe({
      next: (user) => {
        const payload: FullTrip = {
          trip: {
            user_id: user.id,
            country_id: this.selectedDestination?.id || 0,
            duration: 10,
            from_date: this.selectedFlight.departureTime,
            to_date: this.selectedFlight.arrivalTime
          },
          trip_transportation: {
            from_date: this.selectedFlight.departureTime,
            to_date: this.selectedFlight.arrivalTime,
            price: +this.selectedFlight.price,
            url: 'https://www.vol.com',
            status: 'APayer'
          },
          trip_cities: [
            {
              city_id: 1,
              transportations: {
                from_date: this.selectedFlight.departureTime,
                to_date: this.selectedFlight.arrivalTime,
                price: +this.selectedFlight.price,
                url: 'https://www.vol.com',
                status: 'APayer'
              },
              tripCityDays: [{ date: '2025-08-02' }, { date: '2025-08-03' }],
              tripDayActivities: [
                {
                  activity_id: activityId,
                  status: 'Reserve'
                }
              ],
              tripCityHotel: {
                trip_city_id: 1,
                name: this.selectedHotel.name,
                price: 100,
                from: '2025-08-02',
                to: '2025-08-03',
                url: 'https://www.vol32.com',
                adults: 2,
                children: 0,
                longitude: this.selectedHotel.longitude,
                latitude: this.selectedHotel.latitude,
                status: 'APayer'
              }
            }
          ]
        };

        this.tripService.createFullTrip(payload).subscribe({
          next: () => {
            this.toastService.success('Voyage enregistré avec succès !');
            this.isSubmitting = true;
            this.currentStep = 1;
            this.router.navigate(['/', this.translateService.currentLang, 'home']);
          },
          error: (err) => {
            console.error('Erreur lors de la création du voyage :', err);
            this.toastService.error('Erreur lors de la création du voyage');
            this.isSubmitting = false;
          }
        });
      },
      error: () => {
        this.toastService.error("Impossible de récupérer l'utilisateur connecté.");
      }
    });

    // this.tripService.createFullTrip(payload).subscribe({
    //   next: () => {
    //     this.toastService.success('Voyage enregistré avec succès !');
    //     this.currentStep = 1;
    //   },
    //   error: (err) => {
    //     console.error('Erreur lors de la création du voyage :', err);
    //     this.toastService.error('Erreur lors de la création du voyage');
    //   }
    // });
  }

  loadCountries() {
    this.countryService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      }
    });
  }
  onCountrySelect(countryName: string) {
    if (!countryName || !this.countries || this.countries.length === 0) return;

    this.isLoading = true;
    this.selectedCountry = countryName;
    this.destinationParams = { country: countryName };

    const countryData = this.countries.find((c) => c.name.toLowerCase() === countryName.toLowerCase());

    if (countryData) {
      this.countryImage = countryData.image || 'assets/images/noimages.jpg';
      this.countryDescription = countryData.description || 'Aucune description disponible.';

      this.selectedDestination = {
        name: countryData.name,
        image: countryData.image,
        description: countryData.description,
        type: 'country',
        latitude: countryData.latitude,
        longitude: countryData.longitude
      };
    } else {
      this.countryImage = 'assets/images/noimages.jpg';
      this.countryDescription = 'Information non disponible.';
    }

    this.isLoading = false;
  }
}
