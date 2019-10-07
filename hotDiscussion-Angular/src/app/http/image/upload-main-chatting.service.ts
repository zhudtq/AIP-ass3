import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from '../host-url.service'

@Injectable({
  providedIn: 'root'
})
export class UploadMainChattingService {
  baseUrl = this.hostUrlSerivce.hostURL + '/chats'

  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}

  submitMainChat(url: string, model: any) {
    return this.http.post(url, model)
  }


}
