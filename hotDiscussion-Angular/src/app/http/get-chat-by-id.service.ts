import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetChatByIdService {
  baseUrl = 'http://localhost:3000/chat/'

  constructor(private http: HttpClient) {}

  getChat(id: string) {
    return this.http.get(this.baseUrl+id)
  }

}
