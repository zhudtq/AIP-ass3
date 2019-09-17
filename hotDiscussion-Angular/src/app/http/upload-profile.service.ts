import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UploadProfileService {
  
  constructor(private http: HttpClient) { }

  
   uploadImage(formData:any){

    return this.http.post('http://localhost:3000/users/me/avatar', formData)

  }
}
