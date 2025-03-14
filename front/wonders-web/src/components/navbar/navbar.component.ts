import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { UsersService } from '../../app/service/users/users.service';
import { User } from '../../app/model/User';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isAuthenticated = false;
  user: User | null = null;

  constructor(
    private router: Router,
    private _authService: AuthentificationService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe((isAuth) => (this.isAuthenticated = isAuth));

    this.loadUserInfo();
  }

  loadUserInfo() {
    this.usersService.getUserInfo().subscribe({
      next: (userData) => {
        this.user = userData;
        console.log(this.user, 'users');
      },
      error: (error) => {
        console.error('Erreur lors du chargement des informations utilisateur:', error);
      }
    });
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
