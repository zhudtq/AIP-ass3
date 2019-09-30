import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  helper = new JwtHelperService()
  constructor() { }
  tokenGot;
  verifyToken() {
    let token = sessionStorage.getItem('StrawberryToken')
    if (token) {
      return true
    }
    return false
  }

  getToken() {
    if (sessionStorage.getItem('StrawberryToken')){
      return sessionStorage.getItem('StrawberryToken').toString()
    }
    return ''
  }

  decodeToken() {
    let decodedToken = ''
    decodedToken = this.helper.decodeToken(this.getToken())
    return decodedToken
  }

  verifyAdmin() {
    if (this.getToken() == ''){
      return false
    }
    if (this.decodeToken()['role'] == 'admin') {
      return true
    }
    return false
  }

}
