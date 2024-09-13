import { Component, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {Dialog, DIALOG_DATA, DialogModule} from '@angular/cdk/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

interface r {
  image: string,
  city: string,
  date: string
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatCardModule,
    CommonModule,
    DialogModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  dialog = inject(Dialog);

  pseudo: string = 'Stacy';
  email: string = 'stacys@gmail.com';
  username: string = 'Stacy';
  surname: string = 'Smith';
  gender: string = 'Female';
  age: number = 30;
  country: string = 'United States';

  history: r[] = [
    {
      image: 'history1.png',
      city: 'Austin, TX',
      date: '2022'
    },
    {
      image: 'history2.png',
      city: 'Los Angeles, CA',
      date: '2021'
    },
    {
      image: 'history3.png',
      city: 'Maui, HI',
      date: '2021'
    },
    {
      image: 'history4.png',
      city: 'Reno, NV',
      date: '2019'
    }
  ];

  destination: r[] = [
    {
      image: 'history3.png',
      city: 'Maui, Hawaii',
      date: 'Hawaii'
    },
    {
      image: 'history5.png',
      city: 'Bora Bora, French Polynesia',
      date: 'French Polynesia'
    },
    {
      image: 'history6.png',
      city: 'Aspen, Colorado',
      date: 'Colorado'
    },
    {
      image: 'history7.png',
      city: 'Kyoto, Japan',
      date: 'Japan'
    }
  ];

  confirmDelete(): void {
    this.dialog.open(ConfirmDialogComponent, {
      height: '400px',
      width: '600px'
    })
  }
}
