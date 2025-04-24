import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { CityService } from '../../app/service/city/city.service';
import { CountryService } from '../../app/service/country/country.service';
import { GoogleMapComponent } from '../google-map/google-map.component';
import { Destination } from '../../app/model/destination';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, GoogleMapComponent],
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent implements OnInit {
  @Input() queryParams?: { [key: string]: string };
  @Input() hideBackButton: boolean = false;
  @Output() destinationSelected = new EventEmitter<Destination>();

  destination: Destination | null = null;
  searchResults: Destination[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  paginatedResults: Destination[] = [];

  constructor(
    private routes: ActivatedRoute,
    private cityService: CityService,
    private countryService: CountryService,
    private router: Router
  ) {}

  ngOnInit() {
    // Vérifier d'abord s'il y a des queryParams injectés
    if (this.queryParams) {
      this.processQueryParams(this.queryParams);
    } else {
      // Sinon, utiliser les queryParams de l'URL
      this.routes.queryParams.subscribe((params) => {
        this.processQueryParams(params);
      });
    }
  }

  // Ajoute cette méthode pour réagir aux changements de queryParams
  ngOnChanges(changes: SimpleChanges) {
    if (changes['queryParams'] && this.queryParams) {
      this.processQueryParams(this.queryParams);
    }
  }

  // Méthode pour traiter les queryParams (soit de l'URL, soit des inputs)
  processQueryParams(params: any) {
    this.isLoading = true;

    if (params['page']) {
      this.currentPage = parseInt(params['page'], 10) || 1;
    } else {
      this.currentPage = 1;
    }

    if (params['city']) {
      this.searchTerm = params['city'];
      this.loadCity(params['city']);
    } else if (params['country']) {
      this.searchTerm = params['country'];
      this.loadCountry(params['country']);
    } else if (params['search']) {
      this.searchTerm = params['search'];
      this.searchDestinations(params['search']);
    } else {
      this.loadPopularDestinations();
    }
  }

  showPageNumber(page: number): boolean {
    if (page === 1 || page === this.totalPages) {
      return true;
    }

    if (Math.abs(page - this.currentPage) <= 1) {
      return true;
    }
    if (this.totalPages > 7) {
      if (this.currentPage <= 4) {
        // Si on est au début, montre les 5 premières pages
        return page <= 5;
      } else if (this.currentPage >= this.totalPages - 3) {
        // Si on est à la fin, montre les 5 dernières pages
        return page >= this.totalPages - 4;
      } else {
        // Sinon, montre quelques pages autour de la page courante
        return Math.abs(page - this.currentPage) <= 2;
      }
    }
    return true;
  }
  get Math() {
    return Math;
  }

  // Gestion de la pagination
  updatePagination() {
    this.totalPages = Math.ceil(this.searchResults.length / this.itemsPerPage);
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    // Calcule les résultats pour la page courante
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.searchResults.length);
    this.paginatedResults = this.searchResults.slice(startIndex, endIndex);
  }

  // Méthodes de navigation
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  loadCity(cityName: string) {
    const cityReq = {
      activity: ['general'],
      pays: [cityName]
    };

    this.cityService.getAICitySuggestions(cityReq).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          const cityData = response.data[0];
          this.destination = {
            name: cityData.city,
            image: cityData.img_full || '',
            description: cityData.description || 'Aucune description disponible.',
            type: 'city',
            isDescriptionLoading: false,
            isImageLoading: false
          };
          this.destinationSelected.emit(this.destination);
        } else {
          this.destination = null;
          this.searchResults = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la ville:', error);
        this.isLoading = false;
      }
    });
  }
  //Clean les texts
  private cleanFormattedText(text: string): string {
    if (!text) return '';

    let cleaned = text.replace(/#{1,6}\s/g, '');
    cleaned = cleaned.replace(/\*\*/g, '');
    cleaned = cleaned.replace(/\*/g, '');
    cleaned = cleaned.replace(/^\d+\.\s/gm, '');
    cleaned = cleaned.replace(/^[\-\*\•]\s/gm, '');
    cleaned = cleaned.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');

    return cleaned;
  }

  loadCountry(countryName: string) {
    console.log('Chargement du pays:', countryName);

    // Initialiser la destination avec le nom
    this.destination = {
      name: countryName,
      image: '',
      description: '',
      type: 'country',
      isDescriptionLoading: true,
      isImageLoading: true
    };

    this.destinationSelected.emit(this.destination);

    this.isLoading = false;

    // Charge l'image en premier
    this.countryService.getCountryImage(countryName).subscribe({
      next: (imageResponse) => {
        // Met à jour l'image dès qu'elle est disponible
        if (this.destination && imageResponse && imageResponse.data) {
          this.destination.image = imageResponse.data;
        }
        if (this.destination) {
          this.destination.isImageLoading = false;
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement de l'image:", error);
      }
    });

    //Charge la description en parallèle
    this.countryService.getAICountryDescription(countryName).subscribe({
      next: (response) => {
        if (this.destination && response && response.data) {
          const cleanedDescription = this.cleanFormattedText(response.data);
          this.destination.description = cleanedDescription;
        } else if (this.destination) {
          this.destination.description = `${countryName} est une destination fascinante à découvrir.`;
        }
        if (this.destination) {
          this.destination.isDescriptionLoading = false;
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la description:', error);
      }
    });
  }

  loadCountryImage(countryName: string) {
    this.countryService.getCountryImage(countryName).subscribe({
      next: (imageResponse) => {
        if (this.destination && imageResponse && imageResponse.data) {
          this.destination.image = imageResponse.data;
        }

        if (this.destination) {
          this.destination.isImageLoading = false;
        }
      },
      error: (error) => {
        console.error("Erreur lors du chargement de l'image:", error);
        if (this.destination) {
          this.destination.isImageLoading = false;
        }
      }
    });
  }

  searchDestinations(term: string) {
    this.searchResults = [];

    const cityReq = {
      activity: ['general'],
      pays: [term]
    };

    this.cityService.getAICitySuggestions(cityReq).subscribe({
      next: (response) => {
        if (response.data && response.data.length > 0) {
          const cityResults = response.data.map((city) => ({
            name: city.city,
            image: city.img_full || 'assets/images/placeholder.jpg',
            description: city.description || 'Aucune description disponible.',
            type: 'city' as const
          }));

          this.searchResults = [...this.searchResults, ...cityResults];
        }

        this.countryService.getAllCountries().subscribe({
          next: (countries) => {
            const filteredCountries = countries
              .filter((country) => country.name.toLowerCase().includes(term.toLowerCase()))
              .map((country) => ({
                name: country.name,
                image: country.image || 'assets/images/placeholder.jpg',
                description: country.description || 'Découvrez ce pays magnifique.',
                type: 'country' as const
              }));

            this.searchResults = [...this.searchResults, ...filteredCountries];
            this.updatePagination();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération des pays:', error);
            this.updatePagination();
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la recherche de villes:', error);
        this.updatePagination();
        this.isLoading = false;
      }
    });
  }

  loadPopularDestinations() {
    this.isLoading = true;

    // Récupérer tous les pays
    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        console.log('Pays récupérés:', countries.length);

        // Afficher d'abord avec des images placeholder pour une meilleure UX
        this.searchResults = countries.map((country) => ({
          name: country.name,
          image: 'assets/images/placeholder.jpg',
          description: country.description || 'Destination populaire à découvrir.',
          type: 'country' as const
        }));

        // Mettre à jour la pagination et masquer le loader
        this.updatePagination();
        this.isLoading = false;

        // Maintenant, pour chaque pays, charger son image individuellement
        this.loadImagesSequentially(countries);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des destinations populaires:', error);
        this.isLoading = false;
      }
    });
  }

  // Charge les images une par une (pour éviter trop de requêtes simultanées)
  loadImagesSequentially(countries: any[]) {
    countries.forEach((country, index) => {
      setTimeout(() => {
        this.countryService.getCountryImage(country.name).subscribe({
          next: (imageResponse) => {
            console.log(`Image pour ${country.name}:`, imageResponse?.data);

            if (imageResponse && imageResponse.data) {
              try {
                if (imageResponse.data) {
                  const url = new URL(imageResponse.data);

                  const img = new Image();
                  img.onload = () => {
                    if (this.searchResults[index]) {
                      this.searchResults[index].image = imageResponse.data as string;
                      this.updatePagination();
                    }
                  };
                  img.onerror = () => {
                    console.warn(`L'image pour ${country.name} n'a pas pu être chargée`);
                  };
                  img.src = imageResponse.data;
                } else {
                  console.warn(`Pas d'URL d'image pour ${country.name}`);
                }
              } catch (e) {
                console.warn(`URL invalide pour ${country.name}:`, imageResponse.data);
              }
            }
          },
          error: (error) => {
            console.error(`Erreur de chargement d'image pour ${country.name}:`, error);
          }
        });
      }, index * 20);
    });
  }

  viewDestinationDetails(result: Destination) {
    if (result.type === 'city') {
      // Navigue vers la page avec le paramètre de ville
      this.router.navigate(['/destinations'], {
        queryParams: { city: result.name }
      });
    } else {
      // Navigue vers la page avec le paramètre de pays
      this.router.navigate(['/destinations'], {
        queryParams: { country: result.name }
      });
    }
  }
  // retour à la liste des pays
  goBackToList() {
    this.router.navigate(['/destinations']).then(() => {
      window.location.reload();
    });
  }
}
