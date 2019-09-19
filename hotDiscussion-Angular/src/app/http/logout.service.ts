import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from './host-url.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {


  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}
  baseUrl = this.hostUrlSerivce.hostURL + '/users/logoutAll';
  logoutAll() {
    return this.http.delete(this.baseUrl)
  }

  clearToken() {
    sessionStorage.clear()
  }

}
