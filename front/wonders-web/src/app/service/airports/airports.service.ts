import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Airport {
  id?: number;
  name: string;
  city_id: number;
  code: string;
  longitude: number;
  latitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class AirportsService {
  private API_URL = `${environment.airportUrl}/api`; 

  constructor(private http: HttpClient) {}

  getAll(): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.API_URL}/airports/`);
  }

  getById(id: number): Observable<Airport> {
    return this.http.get<Airport>(`${this.API_URL}/airports/${id}`);
  }

  getByCity(cityId: number): Observable<Airport[]> {
    return this.http.get<Airport[]>(`${this.API_URL}/airports/city/${cityId}`);
  }

  getAirportsByCityName(cityName: string): Observable<any[]> {
    return this.http.post<Airport[]>(`${this.API_URL}/airports/cityName`, { cityName });
  }

  getByGeo(longitude: number, latitude: number): Observable<Airport> {
    return this.http.post<Airport>(`${this.API_URL}/airports/geo`, { longitude, latitude });
  }
 
}
