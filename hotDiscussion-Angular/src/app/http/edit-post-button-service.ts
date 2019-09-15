import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditPostButtonService {
  baseUrl = 'http://localhost:3000/edit/'
  options;
  constructor(private http: HttpClient) {}

  postImageId(id) {
    return this.http.post(this.baseUrl + id, {});
  }
  // editBlog(chat) {
  //
  //   return this.http.put(this.baseUrl, chat);
  // }

}
