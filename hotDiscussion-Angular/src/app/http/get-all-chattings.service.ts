import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetAllChattingsService {
  baseUrl = 'http://localhost:3000/chats'

  constructor(private http: HttpClient) {}

  getAllChattings(){
    return this.http.get(this.baseUrl)
  }

}
