import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Hotel, HotelSearchParams } from '../../model/hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = `${environment.UrlReservation}/api/hotel`;

  constructor(private http: HttpClient) {}

  // Récupère la liste des hôtels (route '/')
  getHotels(): Observable<Hotel[]> {
    return this.http.get<Hotel[]>(this.apiUrl);
  }

  searchHotels(params: HotelSearchParams): Observable<any> {
    const filteredParams = Object.entries(params)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .reduce(
        (acc, [key, value]) => {
          acc[key] = value;
          return acc;
        },
        {} as { [key: string]: any }
      );
    const httpParams = new HttpParams({ fromObject: filteredParams });

    return this.http.get<any>(`${this.apiUrl}/list`, { params: httpParams });
  }

  // Méthode pour les offres d'hôtel
  checkHotelOffers(hotelIds: string, adults: string = '2'): Observable<any> {
    const httpParams = new HttpParams({
      fromObject: {
        hotelIds: hotelIds,
        adults: adults
      }
    });
    return this.http
      .get<any>(`${this.apiUrl}/offers`, {
        params: httpParams
      })
      .pipe(
        tap((response) => console.log('Réponse des offres:', response)),
        catchError((error) => {
          console.error('Erreur lors de la récupération des offres:', error);
          return of([]);
        })
      );
  }
}
