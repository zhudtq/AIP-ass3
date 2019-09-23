import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../models/login/userModel';
import { map } from 'rxjs/operators';
import { UserService } from '../../http/signup/user.service';
import { HostUrlService } from '../host-url.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private UserService: UserService, private hostUrlSerivce: HostUrlService) {}

  baseUrl = this.hostUrlSerivce.hostURL + '/users/login';

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
