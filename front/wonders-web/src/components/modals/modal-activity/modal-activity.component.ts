import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ActivityCategory, Picture } from '../../../app/model/activity';
import { ActivityService } from '../../../app/service/activity/activity.service';
import { CityService } from '../../../app/service/city/city.service';
import { ToastService } from '../../../app/service/toast/toast.service';
import { GoogleMapComponent } from '../../google-map/google-map.component';

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
  selector: 'app-modal-activity',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, FormsModule, GoogleMapComponent],
  templateUrl: './modal-activity.component.html',
  styleUrl: './modal-activity.component.css'
})
export class ModalActivityComponent {
  @Input() isOpen = false;
  @Input() cityName: string = '';
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() activityAdded = new EventEmitter<any>();
  // @Output() countryAdded = new EventEmitter<any>();

  steps = ['Catégorie', 'Ville', 'Résumer'];
  currentStep = 0;
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

  get canProceed(): boolean {
    switch (this.currentStep) {
      case 0:
        return !!this.selectedCategory && this.selectedPicture;
      case 1:
        return !!this.selectedCity;
      case 2:
        return true;
      default:
        return false;
    }
  }

  selectCategory(category: ActivityCategory) {
    this.selectedCategory = category;
    this.selectedPicture = category?.picture_id;

    if (this.cityName && category) {
      this.isLoadingCities = true;
      this.cityService
        .getAICitySuggestions({
          activity: [category.name],
          pays: [this.cityName]
        })
        .subscribe({
          next: (response) => {
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

  nextStep() {
    if (this.currentStep < this.steps.length - 1 && this.canProceed) {
      this.currentStep++;
      this.toastService.success('Données sauvegarder avec succès !');
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // selectCity(city: { city: string; img_full: string | null; description: string}) {
  //   this.selectedCity = city;
  //   this.activityName = city.city;
  //   this.selectedPicture = city.img_full;
  // }

  selectCity(city: SuggestedCity) {
    this.selectedCity = {
      city: city.city,
      img_full: city.img_full,
      description: city.description || '' // On gère le cas où description est null
    };
    this.activityName = city.city;
    this.selectedPicture = city.img_full;
    console.log(this.suggestedCities, 'cities');
  }

  onSubmit() {
    if (this.selectedCategory && this.selectedCity) {
      const activity = {
        name: this.selectedCity.city,
        category: this.selectedCategory.name,
        image: this.selectedCity.img_full,
        date: new Date(),
        pays: this.cityName,
        description: this.selectedCity.description
      };

      this.activityAdded.emit(activity);
      this.toastService.success('Activité ajoutée avec succès !');

      this.close();
    }
  }

  close() {
    this.isOpen = false;
    this.isOpenChange.emit(false);
    this.resetForm();
  }

  private resetForm() {
    this.currentStep = 0;
    this.selectedCategory = null;
    this.selectedCity = null;
    this.activityName = '';
    this.activityDate = '';
    this.selectedFile = null;
    this.suggestedCities = [];
  }
}
