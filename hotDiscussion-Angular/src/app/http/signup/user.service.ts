import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Response } from "@angular/http";
import {Observable} from 'rxjs';
import { User } from '../../models/signup/user.model';
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { HostUrlService } from '../host-url/host-url.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router, private hostUrlSerivce: HostUrlService) {   }

  baseUrl = this.hostUrlSerivce.hostURL + '/users/';

  registerUser(user : User){
    const body: User = {
      name: user.name,
      password: user.password,
      email: user.email
      
    }
    return this.http.post(this.baseUrl, user)
    
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    console.log(this.token)
    console.log('logout!')
    // this.router.navigate(["/"]);
  }
  
  login() {
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
    console.log(this.isAuthenticated);
  }
  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
}
