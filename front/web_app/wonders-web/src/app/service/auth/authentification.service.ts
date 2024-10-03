import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentUsers } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private url = environmentUsers.API_URL;

  constructor(private http: HttpClient) {

  }

  // Route pour enregistrer un utilisateur
  register(username: string) {}
}
