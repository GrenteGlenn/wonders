import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserLike } from '../../model/UserLike';

@Injectable({
  providedIn: 'root'
})
export class UserLikeService {
  private API_URL = environment.Blog;

  constructor(private http: HttpClient) {}

  Create(user_id: number, subject_id: number | null) {
    return this.http.post<UserLike>(`${this.API_URL}/api/like`, { user_id: user_id, subject_id: subject_id });
  }

  Delete(userLike: UserLike) {
    return this.http.delete(`${this.API_URL}/api/like/${userLike.id}`);
  }
}
