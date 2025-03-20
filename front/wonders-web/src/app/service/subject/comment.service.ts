import { Injectable } from '@angular/core';
import { Topic } from '../../model/Topic';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, SubjectDetails } from '../../model/Subject';
import { Comment } from '../../model/Subject';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private API_URL = environment.blogApiUrl

  constructor(
    private http: HttpClient
  ) { }

  Create(user_id: number, message: string, subject: string) {
    return this.http.post<Comment>(`${this.API_URL}/comments`, {user_id: user_id, subject: subject, message: message})

  }

  Edit(comment: Comment) {
    return this.http.put<Comment[]>(`${this.API_URL}/comments/${comment.id}`,{user_id: comment.user_id, subject: comment.message})
  }

  Delete(comment: Comment) {
    return this.http.delete(`${this.API_URL}/comments/${comment.id}`)
  }


}
