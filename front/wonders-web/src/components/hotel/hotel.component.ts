import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { HotelService } from '../../app/service/hotel/hotel.service';
import { finalize, forkJoin, of } from 'rxjs';
import { CityService } from '../../app/service/city/city.service';
import { City } from '../../app/model/cities';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.css'
})
export class HotelComponent implements OnInit {
  private fb = inject(FormBuilder);
  private hotelService = inject(HotelService);
  private cityService = inject(CityService);
  private readonly SKIP_FIRST = 99;
  @Output() hotelSelected = new EventEmitter<any>();
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() cityName!: string;
  @Input() countryName!: string | undefined;

  hotelForm: FormGroup = this.fb.group({
    latitude: [48.8651],
    longitude: [2.35652],
    radius: [10],
    hotelScore: [''],
    showOnlyWithOffers: [false]
  });

  ngOnInit() {
    this.loadCitiesForCountry();
    this.hotelForm.patchValue({
      latitude: this.latitude,
      longitude: this.longitude
    });
  }

  hotels: any[] = [];
  filteredHotels: any[] = [];
  displayedHotels: any[] = [];
  isLoading = false;
  isLoadingOffers = false;
  searchDone = false;
  currentPage = 1;
  itemsPerPage = 10;
  showOnlyWithOffers = false;
  selectedHotelId: string | null = null;
  cities: City[] = [];
  selectedCityId: number | null = null;

  searchByName = '';

  private capitalizeWords(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  loadCitiesForCountry() {
    this.cityService.getAllCities().subscribe({
      next: (cities) => {
        this.cities = cities.filter(
          (city) => city.country && city.country.name && city.country.name === this.countryName
        );
        const matchedCity = this.cities.find(
          (city) => Math.abs(city.latitude! - this.latitude) < 0.01 && Math.abs(city.longitude! - this.longitude) < 0.01
        );

        if (matchedCity) {
          this.selectedCityId = matchedCity.id!;
          this.setCoordinatesFromCity(matchedCity);
        }
      },
      error: (err) => console.error('Erreur chargement des villes :', err)
    });
  }

  onCityChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const cityId = +target.value;

    const selected = this.cities.find((c) => c.id === cityId);
    if (selected) {
      this.setCoordinatesFromCity(selected);
    }
  }

  setCoordinatesFromCity(city: City) {
    this.hotelForm.patchValue({
      latitude: city.latitude,
      longitude: city.longitude
    });
  }

  //stock l'id de l'hotel selectionner
  selectHotel(hotel: any) {
    this.selectedHotelId = hotel.hotelId;

    const selectedHotelData = {
      id: hotel.hotelId,
      name: hotel.nameFormatted,
      distance: hotel.distance,
      country: hotel.address?.countryCode,
      hasOffers: hotel.hasOffers,
      offers: hotel.offers || [],
      latitude: hotel.latitude ?? this.hotelForm.value.latitude,
      longitude: hotel.longitude ?? this.hotelForm.value.longitude
    };

    this.hotelSelected.emit(selectedHotelData);
  }

  isSelected(hotel: any): boolean {
    return this.selectedHotelId === hotel.hotelId;
  }

  onSearchHotels() {
    if (this.hotelForm.invalid) return;

    this.isLoading = true;
    const params = this.hotelForm.value;
    this.showOnlyWithOffers = params.showOnlyWithOffers;
    this.searchByName = '';

    this.hotelService.searchHotels(params).subscribe({
      next: (data) => {
        // Ajoute les propriétés pour gérer les offres
        console.log('Hôtels reçus :', data);
        this.hotels = (data || [])
          .filter((hotel: any) => !hotel.name?.toLowerCase().includes('test'))
          .map((hotel: any) => ({
            ...hotel,
            nameFormatted: this.capitalizeWords(hotel.name),
            showOffers: false,
            isLoadingOffers: false,
            offers: null,
            hasOffers: false
          }))
          

        this.searchDone = true;
        this.currentPage = 1;

        if (this.showOnlyWithOffers && this.hotels.length > 0) {
          this.loadAllHotelsOffers();
        } else {
          this.applyFilters();
        }
      },
      error: () => {
        this.hotels = [];
        this.filteredHotels = [];
        this.displayedHotels = [];
        this.searchDone = true;
        this.isLoading = false;
      },
      complete: () => {
        if (!this.showOnlyWithOffers) {
          this.isLoading = false;
        }
      }
    });
  }

  // Méthode pour charger les offres de tous les hôtels
  loadAllHotelsOffers() {
    this.isLoadingOffers = true;
    const hotelsToCheck = this.hotels;
    const requests = hotelsToCheck.map((hotel) => {
      return this.hotelService.checkHotelOffers(hotel.hotelId).pipe(
        finalize(() => {
          hotel.isLoadingOffers = false;
        })
      );
    });

    // Si aucun hôtel à vérifier, on termine directement
    if (requests.length === 0) {
      this.isLoadingOffers = false;
      this.isLoading = false;
      this.applyFilters();
      return;
    }

    forkJoin(requests).subscribe({
      next: (results) => {
        // On met à jour les offres de chaque hôtel
        results.forEach((result, index) => {
          const hotel = hotelsToCheck[index];
          hotel.offers = result?.offers || [];
          hotel.hasOffers = hotel.offers.length > 0;
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement des offres des hôtels', error);
      },
      complete: () => {
        this.isLoadingOffers = false;
        this.isLoading = false;
        this.applyFilters();
      }
    });
  }

  // Méthode pour appliquer tous les filtres (offres et nom)
  applyFilters() {
    if (this.showOnlyWithOffers) {
      this.filteredHotels = this.hotels.filter((hotel) => hotel.hasOffers);
    } else {
      this.filteredHotels = [...this.hotels];
    }
    this.applyNameFilter();

    this.currentPage = 1;
  }
  applyNameFilter() {
    if (!this.searchByName || this.searchByName.trim() === '') {
      this.displayedHotels = [...this.filteredHotels];
      return;
    }

    const searchTerm = this.searchByName.toLowerCase().trim();
    this.displayedHotels = this.filteredHotels.filter(
      (hotel) =>
        hotel.name?.toLowerCase().includes(searchTerm) ||
        hotel.hotelId?.toLowerCase().includes(searchTerm) ||
        hotel.chainCode?.toLowerCase().includes(searchTerm)
    );
  }

  // Méthode pour gérer le changement dans la barre de recherche
  onSearchNameChange(event: any) {
    this.searchByName = event.target.value;
    this.applyNameFilter();
    this.currentPage = 1;
  }

  // Méthode pour basculer le filtre d'offres
  toggleFilter() {
    this.showOnlyWithOffers = !this.showOnlyWithOffers;
    this.hotelForm.patchValue({ showOnlyWithOffers: this.showOnlyWithOffers });

    if (this.showOnlyWithOffers && this.hotels.length > 0) {
      const uncheckedHotels = this.hotels.filter((hotel) => hotel.offers === null);
      if (uncheckedHotels.length > 0) {
        this.loadAllHotelsOffers();
      } else {
        this.applyFilters();
      }
    } else {
      this.applyFilters();
    }
  }

  onResetForm() {
    this.hotelForm.reset({
      latitude: 48.8566,
      longitude: 2.3522,
      radius: 10,
      hotelScore: '',
      showOnlyWithOffers: false
    });
    this.showOnlyWithOffers = false;
    this.searchByName = '';
    this.hotels = [];
    this.filteredHotels = [];
    this.displayedHotels = [];
    this.searchDone = false;
  }

  // Méthode pour afficher/masquer les offres d'un hôtel
  toggleOffers(hotel: any) {
    if (hotel.offers !== null) {
      hotel.showOffers = !hotel.showOffers;
      return;
    }
    // Si on n'a pas encore chargé les offres, on les charge
    hotel.isLoadingOffers = true;
    hotel.showOffers = true;

    this.hotelService
      .checkHotelOffers(hotel.hotelId)
      .pipe(
        finalize(() => {
          hotel.isLoadingOffers = false;
        })
      )
      .subscribe({
        next: (offersData) => {
          // Vérifier si offersData est un tableau
          if (Array.isArray(offersData) && offersData.length > 0) {
            hotel.offers = offersData[0].offers || [];
          } else if (offersData && offersData.offers) {
            hotel.offers = offersData.offers || [];
          } else {
            console.error('Structure de réponse inattendue:', offersData);
            hotel.offers = [];
          }

          hotel.hasOffers = hotel.offers.length > 0;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des offres:', err);
          hotel.offers = [];
          hotel.hasOffers = false;
        }
      });
  }

  get paginatedHotels() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.displayedHotels.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.displayedHotels.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  clearSearch() {
    this.searchByName = '';
    this.applyNameFilter();
  }
}
