import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface ReponseToken {
  success: boolean;
  data: {
    userId: number;
    email: string;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private url = environment.userApiUrl;

  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') ?? '');
    this.user = this.userSubject.asObservable();
    const token = localStorage.getItem('UserToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  // Route pour enregistrer un utilisateur
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/api/auth/register`, user);
  }

  // Route pour se connecter
  login(email: string, password: string): Observable<ReponseToken> {
    return this.http.post<ReponseToken>(`${this.url}/api/auth/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('UserToken');
    this.userSubject.next('');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('UserToken');
  }

  setAuthenticated(token: string): void {
    localStorage.setItem('UserToken', token);
    this.userSubject.next(token);
    this.isAuthenticatedSubject.next(true);
  }
}
