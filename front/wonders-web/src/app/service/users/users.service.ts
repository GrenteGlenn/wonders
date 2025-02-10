import { Injectable } from '@angular/core';
import { User } from '../../model/User';
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
    return this.http.get<User>(`${this.API_URL}/api/users/me`)
  }

  // getUserInfoByUserID(UserID: number) {
  //   return this.http.get<User>(`${this.API_URL}/users/${UserID}`)
  // }

  // getAllUsers(){
  //   return this.http.get<User[]>(`${this.API_URL}/users/users`)
  // }

  // Edit(user: User) {
  //   return this.http.put<User[]>(`${this.API_URL}/users/${user.UserID}`,{username: user.username, password: user.password, email: user.email, adresse: user.adresse, ville: user.ville, zip: user.zip })
  // }

  // Delete(user: User) {
  //   return this.http.delete(`${this.API_URL}/users/${user.UserID}`)
  // }


}
