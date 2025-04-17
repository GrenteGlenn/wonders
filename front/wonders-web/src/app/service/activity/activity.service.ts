import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity, ActivityCategory, Picture } from '../../model/activity';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private API_URL = environment.activityApiUrl;

  constructor(private http: HttpClient) {}

  // Activities
  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.API_URL}/api/activities`);
  }

  getActivityById(id: number): Observable<Activity> {
    return this.http.get<Activity>(`${this.API_URL}/api/activities/${id}`);
  }

  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/activities/${id}`);
  }

  // Activity Categories
  getAllCategories(): Observable<ActivityCategory[]> {
    return this.http.get<ActivityCategory[]>(`${this.API_URL}/activity-category`);
  }

  getCategoryById(id: number): Observable<ActivityCategory> {
    return this.http.get<ActivityCategory>(`${this.API_URL}/api/activity-category/${id}`);
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/api/activity-category/${id}`);
  }

  // Activity picture

  getAllPictures(): Observable<Picture[]> {
    return this.http.get<Picture[]>(`${this.API_URL}/api/picture`);
  }

  getPictureById(id: number): Observable<Picture> {
    return this.http.get<Picture>(`${this.API_URL}/api/picture/${id}`);
  }
}
