import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostUrlService} from "./host-url/host-url.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {
// built express request with the deleted post's id
  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) { }
  baseUrl = this.hostUrlSerivce.hostURL + '/delete/';
  postDeletedImageId(id) {
    return this.http.post(this.baseUrl + id, {});
  }
}
