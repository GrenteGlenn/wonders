import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-activities',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './form-activities.component.html',
  styleUrl: './form-activities.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormActivitiesComponent {
  categories: string[] = ['Outdoor Adventures', 'Food & Wine', 'Art & Culture', 'Wellness & Beauty', 'History & Architecture', 'Nightlife'];
  city: string = 'Santorini';
  grSize: number = 0;

  send() {
    console.log(this.grSize);
  }
}
