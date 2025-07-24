import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { SearchDestinationComponent } from '../search-destination/search-destination.component';
import { CountryService } from '../../app/service/country/country.service';
import { CityService } from '../../app/service/city/city.service';
import { CommonModule } from '@angular/common';
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
export class HomePageComponent implements OnInit, OnDestroy {
  heroImages: string[] = [
    'assets/images/hero-home-1.jpg',
    'assets/images/hero-home-2.jpg',
    'assets/images/hero-home-3.jpg',
    'assets/images/hero-home-4.jpg',
    'assets/images/hero-home-5.jpg',
    'assets/images/hero-home-6.jpg',
    'assets/images/hero-home-7.jpg',
    'assets/images/hero-home-8.jpg'
  ];
  currentHeroIndex = 0;
  intervalId?: any;

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

  fallbackImage: string = 'assets/images/noimages.jpg';
  isMobile: boolean = false;

  constructor(
    private countryService: CountryService,
    private cityService: CityService,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateViewport();
    this.loadDestinationImages();

    this.intervalId = setInterval(() => {
      this.currentHeroIndex = (this.currentHeroIndex + 1) % this.heroImages.length;
    }, 4000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.updateViewport();
  }

  updateViewport(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  loadDestinationImages(): void {
    this.popularDestinations.forEach((destination, index) => {
      this.countryService.getCountryImage(destination.countryName).subscribe({
        next: (response) => {
          if (response && response.data) {
            this.popularDestinations[index].imageSrc = response.data;
          } else {
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
