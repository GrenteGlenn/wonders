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
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '../../../app/service/translate/translate.service';
import { UsersService } from '../../../app/service/users/users.service';
import { catchError, combineLatest, map, of, switchMap } from 'rxjs';
import { CityService } from '../../../app/service/city/city.service';

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
  private norm(s: string | null | undefined): string {
    return (
      String(s ?? '')
        .normalize('NFD')
        // @ts-ignore (unicode classes)
        .replace(/\p{Diacritic}/gu, '')
        .replace(/["“”«»']/g, '')
        .replace(/\s+/g, ' ')
        .toLowerCase()
        .trim()
    );
  }

  private findCountryByName(rawName: string) {
    const target = this.norm(rawName);
    let m = this.countries.find((c) => this.norm(c.name) === target);
    if (m) return m;
    m = this.countries.find((c) => {
      const n = this.norm(c.name);
      return n.includes(target) || target.includes(n);
    });
    if (m) return m;

    //synonymes
    const syn: Record<string, string> = {
      marroc: 'maroc',
      cotedivoire: 'cote divoire',
      royaumeuni: 'royaume uni',
      emiratsarabesunis: 'emirats arabes unis',
      republiquetcheque: 'tchequie',
      etatsunis: 'etats unis'
    };
    const s = syn[target];
    if (s) {
      const target2 = this.norm(s);
      m = this.countries.find((c) => this.norm(c.name) === target2);
      if (m) return m;
    }

    return null;
  }

  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';
  isModalOpen = false;
  isLoading = false;
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
    private user: UsersService,
    private route: ActivatedRoute,
    private cityService: CityService
  ) {}

  private findCityIdByName(name: string, countryName?: string) {
    const target = this.norm(name);
    const country = countryName ? this.norm(countryName) : null;

    return this.cityService.getAllCities().pipe(
      map((cities) => {
        const arr = (cities || []).filter((c) => c?.name && (!country || this.norm(c.country?.name) === country));

        // match exact normalisé
        let hit = arr.find((c) => this.norm(c.name) === target);
        if (hit?.id) return hit.id;

        // match partiel tolérant
        hit = arr.find((c) => {
          const n = this.norm(c.name);
          return n.includes(target) || target.includes(n);
        });
        return hit?.id ?? null;
      })
    );
  }

  handleDestinationSelected(destination: Destination) {
    this.selectedDestination = {
      id: destination.id,
      name: destination.name,
      image: destination.image,
      description: destination.description,
      type: 'country',
      latitude: destination.latitude,
      longitude: destination.longitude
    };
  }
  handleActivitySelected(activity: any) {
    this.selectedActivity = {
      id: activity.category.id,
      category: activity.category,
      name: activity.name,
      description: activity.description,
      image: activity.image,
      latitude: activity.latitude,
      longitude: activity.longitude,
      city_id: activity.city_id
    };
  }
  handleFlightSelected(flight: any) {
    this.selectedFlight = flight;
  }

  handleHotelSelected(hotel: any) {
    this.selectedHotel = hotel;
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
      this.toastService.success(`Données sauvegardées avec succès !`);
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  ngOnInit() {
    const countries$ = this.countryService.getAllCountries();
    const qp$ = this.route.queryParams;

    combineLatest([countries$, qp$]).subscribe({
      next: ([countries, qp]) => {
        this.countries = countries ?? [];
        const preselectedRaw = qp['country'];
        if (preselectedRaw) {
          const preselected = this.norm(preselectedRaw);
          this.onCountrySelect(preselectedRaw);
        }
      },
      error: (err) => console.error('Init step body failed', err)
    });
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

    const nameFromActivity = this.selectedActivity?.name as string | undefined;
    const cityId$ = this.selectedActivity?.city_id
      ? of(Number(this.selectedActivity.city_id))
      : this.findCityIdByName(nameFromActivity ?? '', this.selectedDestination?.name).pipe(
          switchMap((id) => (id != null ? of(id) : this.findCityIdByName(nameFromActivity ?? '')))
        );

    this.user
      .getUserInfo()
      .pipe(
        switchMap((user) => cityId$.pipe(map((cityId) => ({ user, cityId })))),
        catchError((err) => {
          this.toastService.error('Impossible de préparer le voyage.');
          return of(null);
        })
      )
      .subscribe((ctx) => {
        if (!ctx) return;
        const { user, cityId } = ctx;

        if (!cityId) {
          this.toastService.error('Ville introuvable dans la base (nom et coordonnées).');
          return;
        }

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
              city_id: Number(cityId), 
              transportations: {
                from_date: this.selectedFlight.departureTime,
                to_date: this.selectedFlight.arrivalTime,
                price: +this.selectedFlight.price,
                url: 'https://www.vol.com',
                status: 'APayer'
              },
              tripCityDays: [{ date: '2025-08-02' }, { date: '2025-08-03' }],
              tripDayActivities: [{ activity_id: activityId, status: 'Reserve' }],
              tripCityHotel: {
                trip_city_id: Number(cityId),
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
      });
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
    if (!countryName || !this.countries?.length) return;

    this.isLoading = true;
    const cleaned = this.norm(countryName);
    const countryData = this.findCountryByName(cleaned);

    this.selectedCountry = countryName;
    this.destinationParams = { country: countryName };

    if (countryData) {
      this.countryImage = countryData.image || 'assets/images/noimages.jpg';
      this.countryDescription = countryData.description || 'Aucune description disponible.';

      this.selectedDestination = {
        id: countryData.id,
        name: countryData.name,
        image: countryData.image,
        description: countryData.description,
        type: 'country',
        latitude: countryData.latitude,
        longitude: countryData.longitude
      };
    } else {
      this.countryImage = this.countryImage || 'assets/images/noimages.jpg';
      this.countryDescription = 'Information non disponible.';
      this.selectedDestination = null;
    }
    this.isLoading = false;
  }
}
