import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ActivityCategory, Picture } from '../../../app/model/activity';
import { ToastService } from '../../../app/service/toast/toast.service';
import { CityService } from '../../../app/service/city/city.service';
import { ActivityService } from '../../../app/service/activity/activity.service';

export interface Activity {
  name: string;
  date: string;
  image: string;
  category: string;
}

export interface Country {
  id?: number;
  name: string;
}

interface SuggestedCity {
  pays: string;
  city: string;
  img_full: string | null;
  description: string | null;
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.css'
})
export class ActivitiesComponent {
  @Input() cityName: string = '';
  @Output() activitySelected = new EventEmitter<any>();


  categories: ActivityCategory[] = [];
  selectedCategory: ActivityCategory | null = null;
  activityName = '';
  activityDate = '';
  selectedPicture: Picture | any;
  selectedFile: File | null = null;
  selectedCountry: Country | null = null;
  suggestedCities: SuggestedCity[] = [];
  selectedCity: {
    city: string;
    img_full: string | null;
    description: string | null;
  } | null = null;
  isLoadingCities: boolean = false;

  constructor(
    private activityService: ActivityService,
    private cityService: CityService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.activityService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  loadPicture(id: number) {
    this.activityService.getPictureById(id).subscribe({
      next: (picture) => {
        console.log('Picture loaded:', picture);
      },
      error: (error) => {
        console.error('Error loading picture:', error);
      }
    });
  }

  selectCategory(category: ActivityCategory) {
    this.selectedCategory = category;
    this.selectedPicture = category?.picture_id;
  
    // 🆕 Émission partielle de l'activité dès sélection de catégorie
    this.activitySelected.emit({
      name: this.activityName || '',
      image: this.selectedPicture || '',
      description: this.selectedCity?.description || '',
      category: this.selectedCategory?.name || '',
      country: this.cityName,
      
    });
  
    if (this.cityName && category) {
      this.isLoadingCities = true;
      this.cityService
        .getAICitySuggestions({
          activity: [category.name],
          pays: [this.cityName]
        })
        .subscribe({
          next: (response) => {
            console.log('🏙️ Villes suggérées par l’IA :', response.data);

            this.suggestedCities = response.data;
            this.isLoadingCities = false;
          },
          error: (error) => {
            console.error('Erreur lors de la recherche de villes:', error);
            this.isLoadingCities = false;
          }
        });
    }
  }
  
  selectPicture(picture: Picture) {
    this.selectedPicture = picture.path;
  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }


  selectCity(city: SuggestedCity) {
    this.selectedCity = city;
    this.activityName = city.city;
    this.selectedPicture = city.img_full;
  
    this.activitySelected.emit({
      name: city.city,
      image: city.img_full,
      description: city.description || '',
      category: this.selectedCategory?.name || '',
      country: this.cityName,
      longitude: city.longitude,
      latitude: city.latitude
    });
  
    console.log('🎯 Activité émise vers parent :', {
      name: city.city,
      image: city.img_full,
      description: city.description || '',
      category: this.selectedCategory?.name || '',
      country: this.cityName,
      longitude: city.longitude,
      latitude: city.latitude
    });
  }
  
  // onSubmit() {
  //   if (this.selectedCategory && this.selectedCity) {
  //     const activity = {
  //       name: this.selectedCity.city,
  //       category: this.selectedCategory.name,
  //       image: this.selectedCity.img_full,
  //       date: new Date(),
  //       pays: this.cityName,
  //       description: this.selectedCity.description
  //     };

  //     this.toastService.success('Activité ajoutée avec succès !');

  //   }
  // }

 
}
