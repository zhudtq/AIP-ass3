import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from './host-url/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class LikeButtonService {

  // build http and send the id of the liked post to backend likePost API
  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}

  baseUrl = this.hostUrlSerivce.hostURL + '/like/';
  options;

  likeImageId(id) {
    return this.http.put(this.baseUrl + id, {});
  }
}
