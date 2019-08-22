import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/login/userModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'localhost:3000/users/login'

  constructor(private http: HttpClient) {}

  logIn(userModel: UserModel) {
    return this.http.post(this.baseUrl, userModel)
  }

  sayHi(){
    alert('hi')
  }
}
