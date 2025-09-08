import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trip {
  user_id: number;
  country_id: number;
  duration: number;
  from_date: string;
  to_date: string;
  transportation_id?: number;
}

export interface TripTransportation {
  from_date: string;
  to_date: string;
  price: number;
  url: string;
  status: string;
}

export interface TripDayActivity {
  activity_id: number;
  status: string;
}

export interface TripCityDay {
  date: string;
}

export interface TripHotel {
  trip_city_id: number;
  name: string;
  price: number;
  from: string;
  to: string;
  url: string;
  adults: number;
  children: number;
  longitude: number;
  latitude: number;
  status: string;
}

export interface TripCity {
  city_id: number;
  transportations: TripTransportation;
  tripCityDays: TripCityDay[];
  tripDayActivities: TripDayActivity[];
  tripCityHotel: TripHotel;
}

export interface FullTrip {
  trip: Trip;
  trip_transportation: TripTransportation;
  trip_cities: TripCity[];
}

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private baseUrl = 'https://quizz.wonders-travel.fr/api/trip'; 

  constructor(private http: HttpClient) {}

  createFullTrip(payload: FullTrip): Observable<any> {
    return this.http.post(`${this.baseUrl}/create-full-trip`, payload);
  }

  getAllTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getTrip(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getUserFullTrip(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user-full-trip/${userId}`);
  }

  updateTrip(id: number, data: Trip): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteTrip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
