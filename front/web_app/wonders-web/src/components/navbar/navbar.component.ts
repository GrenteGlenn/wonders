import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatButtonModule, 
    MatTooltipModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen = false;


  constructor(private router: Router) {}
  goPlanTrip() {
    this.router.navigate(['planTrip']);
  };
  goHomePage(){
    this.router.navigate(['home']);
  };
  goQuestion(){
    this.router.navigate(['question']);
  };
  goProfile(){
    this.router.navigate(['profile']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
