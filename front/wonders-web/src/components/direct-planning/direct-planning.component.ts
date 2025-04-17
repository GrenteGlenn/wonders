import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../app/service/country/country.service';
import { Router } from '@angular/router';
import { AIProposalCountry, AIQuizzCountry } from '../../app/model/AI';
import { Activity, Country, ModalActivityComponent } from '../modals/modal-activity/modal-activity.component';
import { LucideAngularModule } from 'lucide-angular';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-direct-planning',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ModalActivityComponent, ToastComponent],
  templateUrl: './direct-planning.component.html',
  styleUrl: './direct-planning.component.css'
})
export class DirectPlanningComponent implements OnInit {
  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';
  isModalOpen = false;
  activities: Activity[] = [];
  isLoading = false;
  destination: any = null;



  constructor(
    private countryService: CountryService,
    // private router: Router,
  ) {}

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

      // Charger l'image du pays sélectionné
      this.countryService.getCountryImage(countryName).subscribe({
        next: (response) => {
          if (response.data) {
            this.countryImage = response.data;
          } else {
            // Définir une image par défaut si aucune image n'est trouvée
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

      // Obtenir la description du pays
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

  openModal() {
    this.isModalOpen = true;
  }

  onActivityAdded(activity: any) {
    this.activities.push(activity);
    this.isModalOpen = false;
    console.log('Activité ajoutée avec succès:', activity);
  }

  onCountryAdded(country: Country) {
    console.log('[PlanTripComponent] Pays reçu:', country);
    this.countries.push(country);

    this.selectedCountry = country.name;
    this.onCountrySelect(country.name);
  }
}
