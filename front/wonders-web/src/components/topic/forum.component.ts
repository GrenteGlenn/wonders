import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicService } from '../../app/service/topic/subject.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from '../../app/model/Topic';
import { UsersService } from '../../app/service/users/users.service';
import { User } from '../../app/model/User';
import { CountryService } from '../../app/service/country/country.service';
import { Country } from '../../app/model/Country';
import { TranslateService } from '../../app/service/translate/translate.service';
import { LucideAngularModule } from 'lucide-angular';
import { CountryNameFilterPipe } from '../../app/pipes/country-name-filter.pipe';

@Component({
  selector: 'app-Forum',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, CountryNameFilterPipe],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.css'
})
export class ForumComponent {
  topics: Topic[] = [];
  newTopic = { name: '', country_id: 0 };
  me: User | null = null;
  countries: Country[] | null = [];
  country: Country | null = null;
  isFormVisible: boolean = false;

  // Système de filtre

  searchTerm: string = '';
  selectedCountries: number[] = [];
  showCountryFilter: boolean = false;
  filteredTopics: Topic[] = [];
  // permet avec le pipe de formatter la recherche directement
  countryFilterTerm: string = '';

  sortField: string = 'name';
  sortAsc: boolean = true;

  // pagination

  currentPage: number = 1;
  itemsPerPage: number = 10;
  paginatedTopics: Topic[] = [];
  totalPages: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _topicService: TopicService,
    private _userService: UsersService,
    private _countriesService: CountryService,
    private router: Router,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.getMe();
    this.getTopics();
    this.getCountries();
  }

  getCountries(): void {
    this._countriesService.getAllCountries().subscribe({
      next: (data) => {
        this.countries = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des pays:', error);
      }
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries?.find((c) => c.id === countryId);
    return country ? country.name : 'Pays inconnu';
  }

  getMe(): void {
    this._userService.getUserInfo().subscribe({
      next: (data) => {
        this.me = data;
      },
      error: (error) => {
        console.error('An error occured while fetching me:', error);
      }
    });
  }

  getTopics(): void {
    this._topicService.getAllTopics().subscribe({
      next: (data) => {
        this.topics = data;
        this.filterTopics();
      },
      error: (error) => {
        console.error('An error occured while fetching topics:', error);
      }
    });
  }

  toggleCountrySelection(countryId: number): void {
    if (this.selectedCountries.includes(countryId)) {
      this.selectedCountries = this.selectedCountries.filter((id) => id !== countryId);
    } else {
      this.selectedCountries.push(countryId);
    }
    this.filterTopics();
  }

  filterTopics(): void {
    const filtered = this.topics
      .filter((topic) => {
        const search = this.searchTerm.toLowerCase();
        const nameMatch = topic.name.toLowerCase().includes(search);
        const countryName = this.getCountryName(topic.country_id).toLowerCase();
        const countryMatch = countryName.includes(search);
        const selected = this.selectedCountries.length === 0 || this.selectedCountries.includes(topic.country_id);
        return (nameMatch || countryMatch) && selected;
      })
      .sort((a, b) => {
        const aVal = this.sortField === 'name' ? a.name : this.getCountryName(a.country_id);
        const bVal = this.sortField === 'name' ? b.name : this.getCountryName(b.country_id);
        return this.sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      });
  
    // Pagination
    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTopics = filtered.slice(start, start + this.itemsPerPage);
  }
  

  // Trie par ordre alpha
  sortBy(field: 'name' | 'country') {
    if (this.sortField === field) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortField = field;
      this.sortAsc = true;
    }
    this.filterTopics();
  }

  // reset les filtres

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCountries = [];
    this.sortField = 'name';
    this.sortAsc = true;
    this.filterTopics();
  }

  viewTopic(id: number): void {
    this.router.navigate(['/', this.translateService.currentLang, 'blog', id]);
  }

  createSubject() {
    if (this.newTopic.name && this.newTopic.country_id) {
      this._topicService.Create(this.newTopic.country_id, this.newTopic.name).subscribe({
        next: (response) => {
          this.getTopics();
          this.newTopic = { name: '', country_id: 0 };
        },
        error: (error) => {
          console.error('Erreur lors de la création du sujet:', error);
        }
      });
    }
  }
}
