import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Response } from "@angular/http";
import {Observable} from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly rootUrl = 'http://localhost:4200';

  constructor(private http: HttpClient) {   }

  registerUser(user : User){
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email
      
    }
    return this.http.post(this.rootUrl + '/Register', body);
  }
}
