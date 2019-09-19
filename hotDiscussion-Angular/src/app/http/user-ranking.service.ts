import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRankingService {

  constructor(private http: HttpClient) { }

  getUserRanking(){
    return this.http.get('http://localhost:3000/chats/likes')
  }
}
