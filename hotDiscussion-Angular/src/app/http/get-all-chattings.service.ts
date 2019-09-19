import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from './host-url.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllChattingsService {

  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}

  baseUrl = this.hostUrlSerivce.hostURL + '/chats/';

  getAllChattings(){
    return this.http.get(this.baseUrl)
  }

}
