import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  baseUrl = 'http://localhost:3000/users/logoutAll'

  constructor(private http: HttpClient) {}

  logoutAll() {
    return this.http.delete(this.baseUrl)
  }

  clearToken() {
    sessionStorage.clear()
  }

}
