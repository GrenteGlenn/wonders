import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CountryService } from '../../app/service/country/country.service';
import { Router } from '@angular/router';
import { AIProposalCountry, AIQuizzCountry } from '../../app/model/AI';

@Component({
  selector: 'app-direct-planning',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './direct-planning.component.html',
  styleUrl: './direct-planning.component.css'
})
export class DirectPlanningComponent implements OnInit {
  countries: any[] = [];
  selectedCountry: string = '';
  countryImage: string = '';
  countryDescription: string = '';

  constructor(
    private countryService: CountryService,
    private router: Router
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
      const searchCriteria: AIQuizzCountry = {
        langue: ['français'],
        climat: 'tempéré',
        paysage: 'varié',
        activity: ['tourisme'],
        populaire: true
      };

      this.countryService.searchCountriesAI(searchCriteria).subscribe({
        next: (response: any) => {
          const countryData = response.data.find((c: AIProposalCountry) => 
            c.pays.toLowerCase().trim() === countryName.toLowerCase().trim()
          );
          if (countryData && countryData.img_full) {
            this.countryImage = countryData.img_full;
          }
        }
      });

      this.countryService.getAICountryInfo(countryName).subscribe({
        next: (response) => {
          this.countryDescription = response.data;
        }
      });
    }
  }
}