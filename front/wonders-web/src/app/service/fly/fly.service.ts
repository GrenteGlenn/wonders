import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FlightSearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults?: string;
  children?: string;
  nonStop?: boolean;
  maxPrice?: number;
}

export interface FlightOffersResponse {
  status: string;
  results: number;
  data: any[]; 
}

@Injectable({
  providedIn: 'root'
})
export class FlyService {
  private apiUrl = `${environment.UrlReservation}/api/fly`;

  constructor(private http: HttpClient) {}

  // Récupère la liste des vols (route '/')
  getFlights(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  searchFlights(params: FlightSearchParams): Observable<FlightOffersResponse> {
    const httpParams = new HttpParams({ fromObject: {
      ...params,
      nonStop: params.nonStop ? 'true' : 'false',
      adults: params.adults ?? '2',
      children: params.children ?? '',
      maxPrice: params.maxPrice?.toString() ?? ''
    }});
  
    return this.http.get<FlightOffersResponse>(`${this.apiUrl}/list`, { params: httpParams });
  }
  


 
}