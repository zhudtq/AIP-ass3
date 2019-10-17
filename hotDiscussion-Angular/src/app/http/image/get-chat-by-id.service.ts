import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from '../host-url/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class GetChatByIdService {

  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}

  baseUrl = this.hostUrlSerivce.hostURL + '/chat/';

  getChat(id: string) {
    return this.http.get(this.baseUrl+id)
  }

}
