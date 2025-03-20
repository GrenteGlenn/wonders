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

  Create(country_id: number, name: string) {
    return this.http.post<Subject>(`${this.API_URL}/topics`, {country_id: country_id, name: name})

  }

  Edit(topic: Topic) {
    return this.http.put<Subject[]>(`${this.API_URL}/topics/${topic.id}`,{country_id: topic.country_id, name: topic.name})
  }

  Delete(topic: Topic) {
    return this.http.delete(`${this.API_URL}/topics/${topic.id}`)
  }


}
