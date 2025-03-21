import { Injectable } from '@angular/core';
import { Topic } from '../../model/Topic';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, SubjectDetails } from '../../model/Subject';
@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private API_URL = environment.blogApiUrl

  constructor(
    private http: HttpClient
  ) { }

  getAllSubjects(topic_id: number){
    return this.http.get<Subject[]>(`${this.API_URL}/subjects`, {
        params: { topic_id: topic_id.toString() }
    })
  }

  getOneSubjects(id: number){
    return this.http.get<SubjectDetails>(`${this.API_URL}/subjects/${id}`)
  }

  Create(title: string, content: string, user_id: number, topic: number) {
    return this.http.post<Subject>(`${this.API_URL}/subjects`, {title: title, content: content, user_id: user_id, topic: topic})

  }

  Edit(topic: Topic) {
    return this.http.put<Subject[]>(`${this.API_URL}/topics/${topic.id}`,{country_id: topic.country_id, name: topic.name})
  }

  Delete(topic: Topic) {
    return this.http.delete(`${this.API_URL}/topics/${topic.id}`)
  }


}
