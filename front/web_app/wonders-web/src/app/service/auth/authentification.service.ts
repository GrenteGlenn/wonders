import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/User';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ReponseToken {
  success: boolean,
  data: {
    userId: number,
    email: string,
    token: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private url = environment.quizzApiUrl;

  public user: Observable<string>;
  public userSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<string>(localStorage.getItem('UserToken') ?? '');
    this.user = this.userSubject.asObservable();
  }

  // Route pour enregistrer un utilisateur
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.url}/api/auth/register`, user);
  }

  // Route pour se connecter
  login(email: string, password: string): Observable<ReponseToken> {
    return this.http.post<ReponseToken>(`${this.url}/api/auth/login`, {email, password})
  }

  logout(): void {
    localStorage.removeItem('UserToken');
    this.userSubject.next('');
  }
}
