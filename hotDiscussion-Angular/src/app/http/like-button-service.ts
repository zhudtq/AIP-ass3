import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeButtonService {
  baseUrl = 'http://localhost:3000/like/'
  options;
  constructor(private http: HttpClient) {}

  likeImageId(id) {
    return this.http.put(this.baseUrl + id, {});
  }
}
