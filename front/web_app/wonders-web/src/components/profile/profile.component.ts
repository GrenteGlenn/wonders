import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

interface r {
  city: string,
  date: string
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  pseudo: string = 'Stacy';
  email: string = 'stacys@gmail.com';
  username: string = 'Stacy';
  surname: string = 'Smith';
  gender: string = 'Female';
  age: number = 30;
  country: string = 'United States';

  history: r[] = [
    {
      city: 'Austin, TX',
      date: '2022'
    },
    {
      city: 'Los Angeles, CA',
      date: '2021'
    },
    {
      city: 'Maui, HI',
      date: '2021'
    },
    {
      city: 'Reno, NV',
      date: '2019'
    }
  ];
}
