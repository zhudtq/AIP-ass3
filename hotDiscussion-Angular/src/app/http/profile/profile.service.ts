import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HostUrlService } from '../host-url/host-url.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) { }
  baseUrl = this.hostUrlSerivce.hostURL + '/users/me/profile';

  // Reference to solution :https://stackoverflow.com/questions/45303683/angular-4-execute-function-from-another-component/45305052
  private myListner = new Subject<any>();

    listen(): Observable<any> {
       return this.myListner.asObservable();
    }
    showImage(image: any) {
      this.myListner.next(image);
   }

   uploadImage(formData:any){

    return this.http.post(this.baseUrl, formData)

  }

  getProfile(id: any): Observable<Blob> {
   return this.http.get(this.hostUrlSerivce.hostURL + '/users/' + id + '/profile', {responseType: "blob"})
  }
}
