import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Language {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private API_URStandard = environment.UrlStandard;

  constructor(private http: HttpClient) {}

  // Récupère toutes les langues
  getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.API_URStandard}/api/languages`);
  }

  // Récupère une langue par son ID
  getLanguageById(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.API_URStandard}/api/languages/${id}`);
  }
}