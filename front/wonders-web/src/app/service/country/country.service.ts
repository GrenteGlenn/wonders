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

interface TargetImage {
  pays: string;
}

interface CountryImageResponse {
  data: string | null;
}

interface AIDescriptionResponse {
  data: string;
}

interface CountryAIRequest {
  name: string;
}

interface CountryAIResponse {
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private API_URL = environment.quizzApiUrl;
  private API_URLImg = environment.countryImgUrl;
  private API_URStandard = environment.UrlStandard;

  constructor(private http: HttpClient) {}

  // Attention changer l'urlStandard en URL -> VPN (API_URL)

  // Récupère tous les pays
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.API_URStandard}/api/countries`);
  }

  // Récupérer un pays par son ID
  getCountryById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.API_URStandard}/api/countries/${id}`);
  }

  // Récupérer la description d'un pays
  getCountryDescription(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.API_URStandard}/api/countries/country-description/${id}`);
  }

  // Obtenir des informations IA sur un pays (ne pas toucher)
  getAICountryInfo(countryName: string): Observable<AIDescriptionResponse> {
    return this.http.post<AIDescriptionResponse>(`${this.API_URStandard}/api/countries/ai_get_county`, { name: countryName });
  }
  // Obtenir des informations IA sur un pays (ne pas toucher)
  getAICountryDescription(countryName: string): Observable<AIDescriptionResponse> {
    return this.http.post<CountryAIResponse>(`${this.API_URStandard}/api/countries/ai`, { name: countryName });
  }

  // Rechercher des pays selon des critères
  searchCountriesAI(criteria: AICountryRequest): Observable<AIProposalCountry> {
    return this.http.post<AIProposalCountry>(`${this.API_URStandard}/api/countries/ai_get_country`, criteria);
  }

  // Obtenir l'image d'un pays
  getCountryImage(countryName: string): Observable<CountryImageResponse> {
    return this.http.post<CountryImageResponse>(`${this.API_URLImg}/api/countries/country_image`, {
      pays: countryName
    });
  }
}
