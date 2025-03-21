import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CityService } from '../../app/service/city/city.service';
import { CountryService } from '../../app/service/country/country.service';
import { Router } from '@angular/router';

interface SearchResult {
  id: number;
  name: string;
  type: 'city' | 'country';
  image?: string;
}

@Component({
  selector: 'app-search-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './search-destination.component.html',
  styleUrl: './search-destination.component.css'
})
export class SearchDestinationComponent implements OnInit {
  searchTerm: string = '';
  searchResults: SearchResult[] = [];
  showDropdown: boolean = false;
  isLoading: boolean = false;
  selectedIndex: number = -1;
  
  private searchSubject = new Subject<string>();
  
  constructor(
    private cityService: CityService,
    private countryService: CountryService,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Debounce pour éviter trop d'appels API
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      if (term.length > 2) {
        this.fetchResults(term);
      } else {
        this.searchResults = [];
        this.isLoading = false;
      }
    });
    
    // Ferme le dropdown si on clique ailleurs
    document.addEventListener('click', (event) => {
      if (!(event.target as HTMLElement).closest('.relative')) {
        this.showDropdown = false;
      }
    });
  }
  
  onSearchChange() {
    if (this.searchTerm.length > 2) {
      this.isLoading = true;
      this.showDropdown = true;
      this.searchSubject.next(this.searchTerm);
    } else {
      this.searchResults = [];
      this.isLoading = false;
    }
  }
  
  fetchResults(term: string) {
    this.isLoading = true;
    console.log("Recherche de résultats pour:", term);
    
    // On va stocker tous les résultats ici
    let results: SearchResult[] = [];
    
    // Recherche dans les pays (prioritaire)
    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        const filteredCountries = countries
          .filter(country => country.name.toLowerCase().includes(term.toLowerCase()))
          .map(country => ({
            id: country.id,
            name: country.name,
            type: 'country' as const,
            image: country.image
          }));
        
        results = [...results, ...filteredCountries];
        
        // Après avoir récupéré les pays, on cherche les villes
        this.cityService.getAllCities().subscribe({
          next: (cities) => {
            const filteredCities = cities
              .filter(city => city.name?.toLowerCase().includes(term.toLowerCase()))
              .map(city => ({
                id: city.id || 0,
                name: city.name,
                type: 'city' as const
              }));
              
            // Combiner les deux résultats
            results = [...results, ...filteredCities];
            
            // Tri des résultats par pertinence
            results.sort((a, b) => {
              // Priorité pour les correspondances exactes
              const aExact = a.name.toLowerCase() === term.toLowerCase();
              const bExact = b.name.toLowerCase() === term.toLowerCase();
              
              if (aExact && !bExact) return -1;
              if (!aExact && bExact) return 1;
              
              // Ensuite, priorité pour ceux qui commencent par le terme
              const aStarts = a.name.toLowerCase().startsWith(term.toLowerCase());
              const bStarts = b.name.toLowerCase().startsWith(term.toLowerCase());
              
              if (aStarts && !bStarts) return -1;
              if (!aStarts && bStarts) return 1;
              
              // Enfin, tri alphabétique
              return a.name.localeCompare(b.name);
            });
            
            // Limiter à 10 résultats
            this.searchResults = results.slice(0, 10);
            this.selectedIndex = this.searchResults.length > 0 ? 0 : -1;
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Erreur lors de la récupération des villes:', error);
            // En cas d'erreur, on utilise quand même les pays déjà récupérés
            this.searchResults = results.slice(0, 10);
            this.selectedIndex = this.searchResults.length > 0 ? 0 : -1;
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
        this.isLoading = false;
      }
    });
  }
  
  search() {
    if (this.searchTerm && this.searchResults.length > 0) {
      // Si un terme est entré et des résultats existent, naviguer vers le résultat sélectionné
      this.navigateToSelectedResult();
    } else {
      // Si aucun terme ou aucun résultat, naviguer vers la page destinations sans paramètres
      this.router.navigate(['/destinations']);
    }
  }
  
  navigateToResult(result: SearchResult) {
    if (result.type === 'city') {
      this.router.navigate(['/destinations'], { 
        queryParams: { city: result.name } 
      });
    } else {
      this.router.navigate(['/destinations'], { 
        queryParams: { country: result.name } 
      });
    }
    this.showDropdown = false;
    this.searchTerm = '';
  }
  
  navigateToSelectedResult() {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.searchResults.length) {
      this.navigateToResult(this.searchResults[this.selectedIndex]);
    } else {
      // Si aucun résultat n'est sélectionné mais qu'un terme est entré
      if (this.searchTerm) {
        this.router.navigate(['/destinations'], { 
          queryParams: { search: this.searchTerm } 
        });
      } else {
        // Si aucun terme n'est entré, naviguer vers la page destinations sans paramètres
        this.router.navigate(['/destinations']);
      }
    }
  }
  
  onArrowDown() {
    if (this.searchResults.length > 0) {
      this.selectedIndex = (this.selectedIndex + 1) % this.searchResults.length;
    }
  }
  
  onArrowUp() {
    if (this.searchResults.length > 0) {
      this.selectedIndex = this.selectedIndex <= 0 ? this.searchResults.length - 1 : this.selectedIndex - 1;
    }
  }
  
  // handleImageError(event: any) {
  //   event.target.src = 'assets/images/placeholder.jpg';
  // }
}