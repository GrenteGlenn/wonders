import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../app/service/toast/toast.service';
import { CountryService } from '../../../app/service/country/country.service';
import { FormsModule } from '@angular/forms';
import { DestinationsComponent } from '../../destinations/destinations.component';
import { ActivitiesComponent } from '../../activities/activities/activities.component';
import { FlyComponent } from '../../fly/fly/fly.component';
import { HotelComponent } from "../../hotel/hotel.component";

@Component({
  selector: 'app-step-body',
  standalone: true,
  imports: [CommonModule, FormsModule, DestinationsComponent, ActivitiesComponent, FlyComponent, HotelComponent],
  templateUrl: './step-body.component.html',
  styleUrl: './step-body.component.css'
})
export class StepBodyComponent {
  steps = ['Pays', 'Activités', 'Vols', 'Hotel', 'Prévisualisation'];
  currentStep = 1;
  
  private toastService = inject(ToastService);
  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';
  isModalOpen = false;
  isLoading = false;
  
  // Objet pour passer les queryParams au composant Destinations
  destinationParams: {[key: string]: string} = {};

  constructor(
    private countryService: CountryService
  ) {}

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
      
      // Préparer les paramètres pour le composant Destinations
      this.destinationParams = { country: countryName };

      // Charger l'image du pays sélectionné (tu peux enlever cette partie si c'est géré par Destinations)
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