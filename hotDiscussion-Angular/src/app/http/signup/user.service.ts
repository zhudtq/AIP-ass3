import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Response } from "@angular/http";
import {Observable} from 'rxjs';
import { User } from '../../models/signup/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {   }

  registerUser(user : User){
    const body: User = {
      name: user.name,
      password: user.password,
      email: user.email
      
    }
    return this.http.post(this.baseUrl, user)
    
  }
}
