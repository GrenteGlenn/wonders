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
  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';
  isModalOpen = false;
  isLoading = false;

  //stock les données pour l'étape 5

  selectedDestination: Destination | null = null;
  selectedActivity: any = null;
  selectedFlight: any = null;
  selectedHotel: any = null;

  destinationParams: { [key: string]: string } = {};

  constructor(private countryService: CountryService) {}

  handleDestinationSelected(destination: Destination) {
    this.selectedDestination = destination;
    // console.log(' Destination reçue :', destination);
  }
  handleActivitySelected(activity: any) {
    this.selectedActivity = activity;
    // console.log(' Activité reçue :', activity);
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
      this.toastService.success(`Données sauvegardées avec succès !`);
    }
  }

  prevStep() {
    if (this.currentStep > 1) this.currentStep--;
  }

  ngOnInit() {
    this.loadCountries();
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
    if (countryName) {
      this.isLoading = true;
      this.selectedCountry = countryName;
      this.destinationParams = { country: countryName };

      this.countryService.getCountryImage(countryName).subscribe({
        next: (response) => {
          if (response.data) {
            this.countryImage = response.data;
          } else {
            this.countryImage = 'assets/images/default-country.jpg';
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Erreur lors de la récupération de l'image:", error);
          this.countryImage = 'assets/images/default-country.jpg';
          this.isLoading = false;
        }
      });

      // Cette partie est peut-être redondante si tu utilises le composant Destinations
      this.countryService.getAICountryInfo(countryName).subscribe({
        next: (response) => {
          this.countryDescription = response.data;
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la description:', error);
          this.countryDescription = 'Information not available';
        }
      });
    }
  }
}
