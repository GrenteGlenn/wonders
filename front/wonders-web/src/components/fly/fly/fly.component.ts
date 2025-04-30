import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FlightOffersResponse, FlightSearchParams, FlyService } from '../../../app/service/fly/fly.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fly',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './fly.component.html',
  styleUrl: './fly.component.css'
})
export class FlyComponent {
  @Output() flightSelected = new EventEmitter<any>();

  searchForm: FormGroup;
  isSearching = false;
  searchCompleted = false;
  flights: any[] = [];
  filteredFlights: any[] = []; // Vols filtrés
  errorMessage: string | null = null;

  // Pour la pagination des résultats
  currentPage = 1;
  itemsPerPage = 5;

  // Pour le tri des résultats
  sortBy: string = 'price';

  // Pour les filtres
  filters = {
    direct: true,
    oneStop: true,
    multiStop: true,
    departureTime: {
      morning: true,
      afternoon: true,
      evening: true,
      night: true
    }
  };

  // Pour le filtre de prix
  minPriceFilter: number = 0;
  maxPriceFilter: number = 5000;
  originalMaxPrice: number = 5000;

  // Pour le filtre des compagnies aériennes
  airlines: { code: string, name: string, selected: boolean }[] = [];

  // Codes IATA courants pour les villes françaises (à adapter selon vos besoins)
  airports = [
    { code: 'CDG', name: 'Paris (Charles de Gaulle)' },
    { code: 'ORY', name: 'Paris (Orly)' },
    { code: 'NCE', name: 'Nice' },
    { code: 'SYD', name: 'Sydney' },
    { code: 'MRS', name: 'Marseille' },
    { code: 'TLS', name: 'Toulouse' },
    { code: 'BOD', name: 'Bordeaux' },
    { code: 'NTE', name: 'Nantes' },
    { code: 'JFK', name: 'New York (JFK)' },
    { code: 'LHR', name: 'Londres (Heathrow)' },
    { code: 'MAD', name: 'Madrid' },
    { code: 'FCO', name: 'Rome' }
  ];

  constructor(
    private fb: FormBuilder,
    private flyService: FlyService
  ) {
    this.searchForm = this.fb.group({
      originLocationCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      destinationLocationCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      departureDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      returnDate: ['', [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      adults: ['2', [Validators.required, Validators.min(1)]],
      children: ['0'],
      nonStop: [false],
      includeNearbyAirports: [false],
      travelClass: ['ECONOMY'],
      maxPrice: [null, [Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Initialisation avec la date du jour et date retour par défaut à J+7
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 7);

    this.searchForm.patchValue({
      departureDate: this.formatDate(today),
      returnDate: this.formatDate(returnDate)
    });
  }

  // Formatter la date en YYYY-MM-DD
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.searchForm.invalid) {
      this.markFormGroupTouched(this.searchForm);
      return;
    }

    this.isSearching = true;
    this.searchCompleted = false;
    this.errorMessage = null;
    this.flights = [];

    // Conversion des valeurs si nécessaire
    const params: FlightSearchParams = {
      ...this.searchForm.value,
      originLocationCode: this.searchForm.value.originLocationCode.toUpperCase(),
      destinationLocationCode: this.searchForm.value.destinationLocationCode.toUpperCase()
    };

    this.flyService.searchFlights(params).subscribe({
      next: (response: FlightOffersResponse) => {
        this.flights = response.data;
        this.filteredFlights = [...this.flights];
        this.isSearching = false;
        this.searchCompleted = true;
        this.currentPage = 1;
        
        // Extraire les compagnies aériennes uniques
        this.extractAirlines();
        
        // Déterminer le prix minimum et maximum
        this.setMinMaxPrices();
        
        // Appliquer le tri par défaut
        this.sortFlights();
      },
      error: (err) => {
        this.isSearching = false;
        this.errorMessage = 'Erreur lors de la recherche de vols. Veuillez réessayer.';
        console.error('Erreur de recherche:', err);
      }
    });
  }

  selectFlight(flight: any) {
    const selected = {
      airline: flight.validatingAirlineCodes[0],
      departure: flight.itineraries[0].segments[0].departure.iataCode,
      arrival: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.iataCode,
      price: flight.price.total,
      currency: flight.price.currency,
      departureTime: flight.itineraries[0].segments[0].departure.at,
      arrivalTime: flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1].arrival.at,
      duration: flight.itineraries[0].duration
    };
  
    this.flightSelected.emit(selected);
  }
  

  // Extraire les compagnies aériennes uniques des résultats
  extractAirlines(): void {
    const uniqueAirlines = new Set<string>();
    
    this.flights.forEach(flight => {
      flight.validatingAirlineCodes.forEach((code: string) => {
        uniqueAirlines.add(code);
      });
    });
    
    this.airlines = Array.from(uniqueAirlines).map(code => {
      // On pourrait avoir une liste de correspondance code/nom complète
      // mais pour simplifier, on utilise juste le code si on n'a pas le nom
      const airlineName = this.getAirlineName(code);
      return {
        code,
        name: airlineName || code,
        selected: true
      };
    });
  }

  // Noms de quelques compagnies aériennes
  getAirlineName(code: string): string {
    const airlineMap: { [key: string]: string } = {
      'AF': 'Air France',
      'LH': 'Lufthansa',
      'BA': 'British Airways',
      'IB': 'Iberia',
      'AZ': 'Alitalia',
      'KL': 'KLM',
      'LX': 'Swiss',
      'DL': 'Delta',
      'UA': 'United Airlines',
      'AA': 'American Airlines',
      '6X': 'AirMock' // Compagnie fictive dans votre exemple
    };
    
    return airlineMap[code] || code;
  }

  // Déterminer le prix minimum et maximum
  setMinMaxPrices(): void {
    if (this.flights.length === 0) return;
    
    let min = Infinity;
    let max = 0;
    
    this.flights.forEach(flight => {
      const price = parseFloat(flight.price.total);
      if (price < min) min = price;
      if (price > max) max = price;
    });
    
    this.minPriceFilter = Math.floor(min);
    this.maxPriceFilter = Math.ceil(max);
    this.originalMaxPrice = this.maxPriceFilter;
  }

  // Tri des vols
  sortFlights(): void {
    switch (this.sortBy) {
      case 'price':
        this.filteredFlights.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total));
        break;
      case 'price-desc':
        this.filteredFlights.sort((a, b) => parseFloat(b.price.total) - parseFloat(a.price.total));
        break;
      case 'duration':
        this.filteredFlights.sort((a, b) => {
          const durationA = this.parseDuration(a.itineraries[0].duration);
          const durationB = this.parseDuration(b.itineraries[0].duration);
          return durationA - durationB;
        });
        break;
      case 'departure':
        this.filteredFlights.sort((a, b) => {
          const timeA = new Date(a.itineraries[0].segments[0].departure.at).getTime();
          const timeB = new Date(b.itineraries[0].segments[0].departure.at).getTime();
          return timeA - timeB;
        });
        break;
      case 'arrival':
        this.filteredFlights.sort((a, b) => {
          const segmentsA = a.itineraries[0].segments;
          const segmentsB = b.itineraries[0].segments;
          const arrivalA = new Date(segmentsA[segmentsA.length - 1].arrival.at).getTime();
          const arrivalB = new Date(segmentsB[segmentsB.length - 1].arrival.at).getTime();
          return arrivalA - arrivalB;
        });
        break;
    }
    this.currentPage = 1;
  }

  // Parse la durée au format PT8H15M (8 heures 15 minutes) en minutes
  parseDuration(duration: string): number {
    const matches = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!matches) return 0;
    
    const hours = matches[1] ? parseInt(matches[1], 10) : 0;
    const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    
    return hours * 60 + minutes;
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.filteredFlights = this.flights.filter(flight => {
      // Filtre par prix
      const price = parseFloat(flight.price.total);
      if (price > this.maxPriceFilter) return false;
      
      // Filtre par compagnie aérienne
      const airlineMatch = flight.validatingAirlineCodes.some((code: string) => {
        const airline = this.airlines.find(a => a.code === code);
        return airline && airline.selected;
      });
      if (!airlineMatch) return false;
      
      // Filtre par nombre d'escales (aller uniquement pour simplifier)
      const stops = flight.itineraries[0].segments.length - 1;
      if (stops === 0 && !this.filters.direct) return false;
      if (stops === 1 && !this.filters.oneStop) return false;
      if (stops > 1 && !this.filters.multiStop) return false;
      
      // Filtre par heure de départ
      const departureHour = new Date(flight.itineraries[0].segments[0].departure.at).getHours();
      if (departureHour >= 6 && departureHour < 12 && !this.filters.departureTime.morning) return false;
      if (departureHour >= 12 && departureHour < 18 && !this.filters.departureTime.afternoon) return false;
      if (departureHour >= 18 && departureHour < 24 && !this.filters.departureTime.evening) return false;
      if ((departureHour >= 0 && departureHour < 6) && !this.filters.departureTime.night) return false;
      
      return true;
    });
    
    // Réappliquer le tri après filtrage
    this.sortFlights();
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.filters = {
      direct: true,
      oneStop: true,
      multiStop: true,
      departureTime: {
        morning: true,
        afternoon: true,
        evening: true,
        night: true
      }
    };
    
    // Réinitialiser le filtre de prix
    this.maxPriceFilter = this.originalMaxPrice;
    
    // Réinitialiser le filtre des compagnies aériennes
    this.airlines.forEach(airline => airline.selected = true);
    
    // Réappliquer les filtres (qui seront tous actifs)
    this.filteredFlights = [...this.flights];
    this.sortFlights();
  }

  // Marquer tous les champs comme touchés pour afficher les erreurs
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();

      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }

  resetSearch(): void {
    this.searchForm.reset({
      adults: '2',
      children: '0',
      nonStop: false,
      includeNearbyAirports: false,
      travelClass: 'ECONOMY'
    });
    const today = new Date();
    const returnDate = new Date();
    returnDate.setDate(today.getDate() + 7);

    this.searchForm.patchValue({
      departureDate: this.formatDate(today),
      returnDate: this.formatDate(returnDate)
    });

    this.searchCompleted = false;
    this.flights = [];
    this.filteredFlights = [];
  }

  // Pagination
  get paginatedFlights() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFlights.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredFlights.length / this.itemsPerPage);
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  // Formater le prix
  formatPrice(price: number, currency: string): string {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: currency }).format(price);
  }

  // Récupérer le nom complet de l'aéroport à partir du code
  getAirportName(code: string): string {
    const airport = this.airports.find((a) => a.code === code);
    return airport ? airport.name : code;
  }
}