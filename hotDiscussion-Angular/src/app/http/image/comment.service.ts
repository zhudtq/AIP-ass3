import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from '../host-url.service'

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl = this.hostUrlSerivce.hostURL + "/comment"
  changePicUrl = this.hostUrlSerivce.hostURL + "/edit"

  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) { }

  postComment(url: string, model: any) {
    return this.http.post(url, model)
  }
}
