import { Injectable } from '@angular/core';
import { Topic } from '../../model/Topic';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  private API_URL = environment.Blog;

  constructor(private http: HttpClient) {}

  getAllTopics() {
    return this.http.get<Topic[]>(`${this.API_URL}/api/topics`);
  }

  getOneTopic(id: number) {
    return this.http.get<Topic[]>(`${this.API_URL}/api/topics/${id}`);
  }

  Create(country_id: number, name: string) {
    return this.http.post<Topic>(`${this.API_URL}/api/topics`, { country_id: country_id, name: name });
  }

  Edit(topic: Topic) {
    return this.http.put<Topic[]>(`${this.API_URL}/api/topics/${topic.id}`, {
      country_id: topic.country_id,
      name: topic.name
    });
  }

  Delete(topic: Topic) {
    return this.http.delete(`${this.API_URL}/api/topics/${topic.id}`);
  }
}
