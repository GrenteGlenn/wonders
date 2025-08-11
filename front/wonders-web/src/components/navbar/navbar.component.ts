import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthentificationService } from '../../app/service/auth/authentification.service';
import { UsersService } from '../../app/service/users/users.service';
import { User } from '../../app/model/User';
import { TranslateService } from '../../app/service/translate/translate.service';
import { filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    LucideAngularModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  isMobileMenuOpen = false;
  isAuthenticated = false;
  user: User | null = null;
  showBottomCTA = false;
  genericAvatar = 'https://github.com/shadcn.png'

  constructor(
    private router: Router,
    private _authService: AuthentificationService,
    private usersService: UsersService,
    public translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe(
      (isAuth) => (this.isAuthenticated = isAuth)
    );

    this.loadUserInfo();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncLanguageWithUrl();
        this.closeMenu();
        this.closeMobileMenu();
        this.checkIfHomePage();
      });
  }

  loadUserInfo() {
    this.usersService.getUserInfo().subscribe({
      next: (userData) => {
        this.user = userData;

      },
      error: (error) => {
        console.error('Error while getting user data:', error);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  goHomePage() {
    this.router.navigate(['/', this.translateService.currentLang, 'home']);
  }

  goForum() {
    this.router.navigate(['/', this.translateService.currentLang, 'forum']);
  }

  goChat() {
    this.router.navigate(['/', this.translateService.currentLang, 'chat']);
  }

  goChoiceGuide() {
    this.router.navigate(['/', this.translateService.currentLang, 'choice-guide']);
  }

  goProfile() {
    this.router.navigate(['/', this.translateService.currentLang, 'profile']);
  }

  login() {
    this.router.navigate(['/', this.translateService.currentLang, 'login']);
  }

  disconnect() {
    this._authService.logout();
    this.router.navigate(['/', this.translateService.currentLang, 'login']);
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const lang = target.value;

    this.translateService.currentLang = lang;

    const currentUrl = this.router.url.split('/').slice(2).join('/');
    this.router.navigate(['/' + lang, currentUrl]);
  }

  private syncLanguageWithUrl(): void {
    const urlSegments = this.router.url.split('/');
    const potentialLang = urlSegments[1];

    if (potentialLang && (potentialLang === 'fr' || potentialLang === 'en')) {
      if (this.translateService.currentLang !== potentialLang) {
        this.translateService.currentLang = potentialLang;
      }
    }
  }

  private checkIfHomePage(): void {
    const segments = this.router.url.split('/');
    this.showBottomCTA = segments.length >= 3 && segments[2] === 'home';
  }

  goToSafe() {
    this.router.navigate(['/fr/secure-safe']);
  }
}
