import { Injectable } from '@angular/core';
import { FetchableUser } from '../../model/User';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthentificationService } from '../auth/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL = environment.userApiUrl

  constructor(
    private http: HttpClient,
    private authService: AuthentificationService
  ) { }

  getUserInfo(){
    return this.http.get<FetchableUser>(`${this.API_URL}/api/users/me`)
  }

  getUserInfoByUserID(UserID: number) {
    return this.http.get<FetchableUser>(`${this.API_URL}/api/users/${UserID}`)
  }

  // getAllUsers(){
  //   return this.http.get<User[]>(`${this.API_URL}/users/users`)
  // }

  Edit(user: FetchableUser) {
    return this.http.put<FetchableUser[]>(`${this.API_URL}/api/users/${user.id}`,{username: user.first_name, password: user.password, email: user.email })
  }

  Delete(user: FetchableUser) {
    return this.http.delete(`${this.API_URL}/users/${user.id}`)
  }


}
