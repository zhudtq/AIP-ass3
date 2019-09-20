import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = "http://localhost:3000/comment"

  constructor(private http: HttpClient) { }

  postComment(url: string, model: any) {
    return this.http.post(url, model)
  }
}
