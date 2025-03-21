import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import de CommonModule
import { TopicService } from '../../app/service/topic/subject.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic } from '../../app/model/Topic';
import { UsersService } from '../../app/service/users/users.service';
import { User } from '../../app/model/User';
import { CountryService } from '../../app/service/country/country.service';
import { Country } from '../../app/model/Country';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, FormsModule], // Ajoute CommonModule ici
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
})
export class TopicComponent {
  topics: Topic[] = []
  newTopic = { name: '', country_id: 0 }
  me: User | null = null
  countries: Country[] | null = []
  country: Country | null = null 
  isFormVisible: boolean = false

  constructor(
    private route: ActivatedRoute,
    private _topicService: TopicService,
    private _userService: UsersService,
    private _countriesService: CountryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMe()
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
    const country = this.countries?.find(c => c.id === countryId);
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
      },
      error: (error) => {
        console.error('An error occured while fetching topics:', error);
      }
    });
  }

    viewTopic(id: number): void {
      console.log(id);
      
      this.router.navigate(['/blog', id]);
    }

    createSubject() {
      if (this.newTopic.name && this.newTopic.country_id) {
        this._topicService.Create(this.newTopic.country_id, this.newTopic.name)
          .subscribe({
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
