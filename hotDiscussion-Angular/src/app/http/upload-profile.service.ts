import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HostUrlService } from './host-url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadProfileService {
  
  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) { }
  baseUrl = this.hostUrlSerivce.hostURL + '/users/me/avatar';
  
   uploadImage(formData:any){

    return this.http.post(this.baseUrl, formData)

  }

  getAvatar(id: any): Observable<Blob> {
   return this.http.get(this.hostUrlSerivce.hostURL + '/users/' + id + '/avatar', {responseType: "blob"})
  }
}
