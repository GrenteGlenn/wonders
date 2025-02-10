import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AIProposalCountry } from '../../model/AI';

interface Country {
  id: number;
  name: string;
  code: string;
  description: string;
  image: string;
  language: number;
  created_at: Date;
  updated_at: Date;
}

interface AICountryRequest {
  langue: string[];
  climat: string;
  paysage: string;
  activity: string[];
  populaire: boolean;
}

interface AICountryResponse {
  data: {
    pays: string;
    img_full: string | null;
  }[];
}

interface AIDescriptionResponse {
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private API_URL = environment.quizzApiUrl;

  constructor(private http: HttpClient) {}

  // Récupérer tous les pays
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URL}/api/countries`);
  }

  // Récupérer un pays par son ID
  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.API_URL}/api/countries/${id}`);
  }

  // Récupérer la description d'un pays
  getCountryDescription(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.API_URL}/api/countries/country-description/${id}`);
  }

  // Obtenir des informations IA sur un pays
  getAICountryInfo(countryName: string): Observable<AIDescriptionResponse> {
    return this.http.post<AIDescriptionResponse>(`${this.API_URL}/api/countries/ai_get_county`, { name: countryName });
  }

  // Rechercher des pays selon des critères
  searchCountriesAI(criteria: AICountryRequest): Observable<AIProposalCountry> {
    return this.http.post<AIProposalCountry>(`${this.API_URL}/api/countries/ai_get_country`, criteria);
  }


}