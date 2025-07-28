import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface UserGroupInterface {
  id?: number;
  name: string;
  users?: UserGroupLinkInterface[];
  created_at?: Date;
  updated_at?: Date;
}

interface UserGroupLinkInterface {
  id?: number;
  user_id: number;
  user_group_id: number;
  is_accepted: boolean;
  is_owner: boolean;
  user_quiz_answer_id?: number | null;
  created_at?: Date;
  updated_at?: Date;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = `${environment.userApiUrl}/api/user-group`;

  constructor(private http: HttpClient,) { }

  getAllGroups(id: number): Observable<UserGroupInterface[]> {
    return this.http.get<UserGroupInterface[]>(`${this.apiUrl}/by-user/${id}`);
  }

  getGroupById(id: number): Observable<UserGroupInterface> {
    return this.http.get<UserGroupInterface>(`${this.apiUrl}/${id}`);
  }

  createGroup(name: string, user_id: string | number): Observable<any> {
    return this.http.post(`${this.apiUrl}`, {name: name, user_id: user_id})
  }

  addUserToGroup(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-user`, body);
  }

  acceptToJoinToGroup(body: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/accept-join-group`, body);
  }
  removeUserFromGroup(id: number, groupId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/remove-user/${id}/${groupId}`);
  }

  deleteGroup(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}