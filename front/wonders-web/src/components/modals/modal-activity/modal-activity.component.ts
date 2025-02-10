import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { ActivityCategory, Picture } from '../../../app/model/activity';
import { ActivityService } from '../../../app/service/activity/activity.service';


export interface Activity {
  name: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-modal-activity',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    FormsModule
  ],
  templateUrl: './modal-activity.component.html',
  styleUrl: './modal-activity.component.css'
})
export class ModalActivityComponent {
  @Input() isOpen = false;
  @Output() isOpenChange = new EventEmitter<boolean>();
  @Output() activityAdded = new EventEmitter<any>();

  steps = ['Catégorie', 'Détails', 'Image'];
  currentStep = 0;
  categories: ActivityCategory[] = [];
  selectedCategory: ActivityCategory | null = null;
  activityName = '';
  activityDate = '';
  selectedPicture: Picture | any;
  selectedFile: File | null = null;

  constructor(private activityService: ActivityService) {}

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
        // Traitement de l'image
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
        return !!this.selectedCategory && !!this.selectPicture;
      case 1:
        return !!this.activityName && !!this.activityDate;
      case 2:
        return true; // Image is optional
      default:
        return false;
    }
  }

  selectCategory(category: ActivityCategory) {
    this.selectedCategory = category;
  }

  selectPicture(picture: Picture) {
    this.selectedPicture = picture.path;
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1 && this.canProceed) {
      this.currentStep++;
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

  onSubmit() {
    if (this.selectedCategory && this.activityName && this.activityDate) {
      const activity = {
        name: this.activityName,
        date: this.activityDate,
        category_id: this.selectedCategory.id,
        image: this.selectedFile ? URL.createObjectURL(this.selectedFile) : null
      };

      this.activityAdded.emit(activity);
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
    this.activityName = '';
    this.activityDate = '';
    this.selectedFile = null;
  }

}
