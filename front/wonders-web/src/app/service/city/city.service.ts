import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Country } from '../../model/Country';


interface City {
  id?: number;
  name: string;
  country: Country;
  created_at?: Date;
  updated_at?: Date;
}

interface CityAIRequest {
  activity: string[];
  pays: string[];
}

interface CityAIResponse {
  data: {
    pays: string;
    city: string;
    img_full: string | null;
    description: string | null;
    longitude: number;
    latitude: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private apiUrl = environment.Country;

  constructor(private http: HttpClient, ) {}

  // Récupère toutes les villes
  getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/api/cities`);
  }

  // Récupère une ville par son ID
  getCityById(id: number): Observable<City> {
    return this.http.get<City>(`${this.apiUrl}/api/cities/${id}`);
  }
  

  // Supprime une ville
  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/cities/${id}`);
  }

  // Obtenir des suggestions de villes via l'IA
  getAICitySuggestions(data: CityAIRequest): Observable<CityAIResponse> {
    return this.http.post<CityAIResponse>(`${this.apiUrl}/api/cities/ai_get_city`, data);
  }
}
