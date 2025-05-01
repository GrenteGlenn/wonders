import { Component, OnInit } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SearchDestinationComponent } from "../search-destination/search-destination.component";
import { CountryService } from '../../app/service/country/country.service';
import { CityService } from '../../app/service/city/city.service';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '../../app/service/translate/translate.service';
import { TranslateModule } from '@ngx-translate/core';

interface PopularDestination {
  cityName: string;
  countryName: string;
  imageSrc: string | null;
  description: string;
  loading: boolean;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LucideAngularModule, SearchDestinationComponent, CommonModule, TranslateModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  popularDestinations: PopularDestination[] = [
    {
      cityName: 'Bangkok',
      countryName: 'Thaïlande',
      imageSrc: null,
      description: 'Découvrez la culture vibrante',
      loading: true
    },
    {
      cityName: 'Tokyo',
      countryName: 'Japon',
      imageSrc: null,
      description: 'Une métropole fascinante',
      loading: true
    },
    {
      cityName: 'New York',
      countryName: 'États-Unis',
      imageSrc: null,
      description: 'La ville qui ne dort jamais',
      loading: true
    },
    {
      cityName: 'Denpasar',
      countryName: 'Indonésie',
      imageSrc: null,
      description: 'Détente à Bali',
      loading: true
    }
  ];

  fallbackImage: string = 'assets/images/placeholder.jpg';

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadDestinationImages();
  }

  loadDestinationImages(): void {
    // Pour chaque destination, on charge l'image du pays
    this.popularDestinations.forEach((destination, index) => {
      this.countryService.getCountryImage(destination.countryName).subscribe({
        next: (response) => {
          if (response && response.data) {
            this.popularDestinations[index].imageSrc = response.data;
          } else {
            // Si l'image n'est pas disponible, on utilise une image par défaut
            this.popularDestinations[index].imageSrc = this.fallbackImage;
          }
          this.popularDestinations[index].loading = false;
        },
        error: (error) => {
          console.error(`Erreur lors du chargement de l'image pour ${destination.countryName}:`, error);
          this.popularDestinations[index].imageSrc = this.fallbackImage;
          this.popularDestinations[index].loading = false;
        }
      });
    });
  }

  handleImageError(event: any): void {
    event.target.src = this.fallbackImage;
  }

  showMore(): void {
    this.router.navigate(['/', this.translateService.currentLang, 'destinations']);

  }
}