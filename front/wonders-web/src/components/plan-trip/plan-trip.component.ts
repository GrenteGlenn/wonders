import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CountryService } from '../../app/service/country/country.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Activity, ModalActivityComponent } from '../modals/modal-activity/modal-activity.component';
import { Country } from '../../app/model/Country';

@Component({
  selector: 'app-plan-trip',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, CommonModule, ModalActivityComponent],
  templateUrl: './plan-trip.component.html',
  styleUrl: './plan-trip.component.css'
})
export class PlanTipComponent implements OnInit {
  cityImage: string = '';
  cityName: string = '';
  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';

  isModalOpen = false;
  activities: Activity[] = [];

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.cityImage = params['image'];
      this.cityName = params['city'];
    });
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
      // Trouver les données du pays sélectionné
      const selectedCountryData = this.countries.find((c) => c.name === countryName);
      if (selectedCountryData) {
        this.countryImage = selectedCountryData.image;

        // Charger les informations détaillées du pays
        this.countryService.getAICountryInfo(countryName).subscribe({
          next: (response) => {
            this.countryDescription = response.data;
          },
          error: (error) => {
            console.error('Error loading country info:', error);
          }
        });
      }
    }
  }

  // Ouvre la modal-activity
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
