import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-requirements',
  standalone: true,
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './requirements.component.html',
  styleUrl: './requirements.component.css'
})
export class RequirementsComponent {
  @Input() currentStep: number = 1;

  @Input() selectedDestination: any = null;
  @Input() countryImage: string = '';
  @Input() countryDescription: string = '';

  @Input() selectedActivity: any = null;
  @Input() selectedFlight: any = null;
  @Input() selectedHotel: any = null;


  
 
  hasFullActivity(): boolean {
    return !!(
      this.selectedActivity?.name &&
      this.selectedActivity?.description &&
      this.selectedActivity?.image &&
      this.selectedActivity?.category
    );
  }
  
}
