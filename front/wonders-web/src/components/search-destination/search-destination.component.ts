import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CityService } from '../../app/service/city/city.service';
import { CountryService } from '../../app/service/country/country.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../app/service/translate/translate.service';
import { TranslateModule } from '@ngx-translate/core';

interface SearchResult {
  id: number;
  name: string;
  type: 'city' | 'country';
  image?: string;
}

@Component({
  selector: 'app-search-destination',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, TranslateModule],
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
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit() {
    // Debounce pour éviter trop d'appels API
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      if (term.length > 2) {
        this.fetchResults(term);
      } else {
        this.searchResults = [];
        this.isLoading = false;
      }
    });
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

    this.countryService.getAllCountries().subscribe({
      next: (countries) => {
        const filteredCountries = countries
          .filter((country) => country.name.toLowerCase().includes(term.toLowerCase()))
          .map((country) => ({
            id: country.id,
            name: country.name,
            type: 'country' as const,
            image: country.image
          }));

        // Tri les résultats par pertinence
        filteredCountries.sort((a, b) => {
          const aExact = a.name.toLowerCase() === term.toLowerCase();
          const bExact = b.name.toLowerCase() === term.toLowerCase();

          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;

          const aStarts = a.name.toLowerCase().startsWith(term.toLowerCase());
          const bStarts = b.name.toLowerCase().startsWith(term.toLowerCase());

          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          return a.name.localeCompare(b.name);
        });

        // Limite à 10 résultats
        this.searchResults = filteredCountries.slice(0, 10);
        this.selectedIndex = this.searchResults.length > 0 ? 0 : -1;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
        this.searchResults = [];
        this.selectedIndex = -1;
        this.isLoading = false;
      }
    });
  }

  search() {
    if (this.searchTerm && this.searchResults.length > 0) {
      this.navigateToSelectedResult();
    } else {
      this.router.navigate(['/', this.translateService.currentLang, 'destinations']);
    }
  }

  navigateToResult(result: SearchResult) {
    if (result.type === 'city') {
      this.router.navigate(['/', this.translateService.currentLang, 'destination'], {
        queryParams: { city: result.name }
      });
    } else {
      this.router.navigate(['/', this.translateService.currentLang, 'destination'], {
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
        this.router.navigate(['/', this.translateService.currentLang, 'destination'], {
          queryParams: { search: this.searchTerm }
        });
      } else {
        // Si aucun terme n'est entré, naviguer vers la page destinations sans paramètres
        this.router.navigate(['/', this.translateService.currentLang, 'destination']);
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
}
