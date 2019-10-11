import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HostUrlService} from "./host-url/host-url.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) { }
  baseUrl = this.hostUrlSerivce.hostURL + '/delete/';
  postImageId(id) {
    return this.http.post(this.baseUrl + id, {});
  }
}
