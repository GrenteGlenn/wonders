import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../app/service/auth/authentification.service';

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
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isAuthenticated = false;

  constructor(private router: Router, private _authService: AuthentificationService) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe(
      isAuth => this.isAuthenticated = isAuth
    );
  }

  goChoiceGuide() {
    this.router.navigate(['choice-guide']);
  }
  goHomePage() {
    this.router.navigate(['home']);
  }
  goQuestion() {
    this.router.navigate(['question']);
  }
  goProfile() {
    this.router.navigate(['profile']);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  disconnect() {
    this._authService.logout();
  }

  login() {
    this.router.navigate(['login']);
  }
}
