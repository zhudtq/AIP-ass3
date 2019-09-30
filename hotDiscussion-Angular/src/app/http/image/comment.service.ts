import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = "http://localhost:3000/comment"
  changePicUrl = "http://localhost:3000/edit"

  constructor(private http: HttpClient) { }

  postComment(url: string, model: any) {
    return this.http.post(url, model)
  }
}
