import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/login/userModel';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = 'http://localhost:3000/users/login'

  constructor(private http: HttpClient) {}

  logIn(userModel: UserModel) {
    return this.http.post(this.baseUrl, userModel)
      .pipe(
        map((response: UserModel) => {
          const userResponse: UserModel = response
          const token: String = userResponse.token
          sessionStorage.setItem('StrawberryToken', token.toString())
        })
      )
  }

}
