import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from '../host-url/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class SendEmojiService {
  baseUrl = this.hostUrlSerivce.hostURL + '/emoji'
  
  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}

  postEmoji(model: any) {
    return this.http.post(this.baseUrl, model)
  }

  sayHi() {
    alert(1)
  }
}
