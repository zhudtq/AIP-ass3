import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../http/signup/user.service';
import { Subscription } from "rxjs";
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { LogoutService } from '../../../http/logout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthenticationService, LogoutService]
})
export class NavigationComponent implements OnInit{

  userIsAuthenticated = false;
  userName = '';
  // private authListenerSubs: Subscription;

  constructor(private UserService: UserService, private authService: AuthenticationService,
    private logoutService: LogoutService, private toastrService: ToastrService) { }

  onLogout(){
    this.logoutService.logoutAll().subscribe(()=> {
      this.logoutService.clearToken()
      this.userIsAuthenticated = false;
      this.toastrService.success('Log out successfully', 'Success')
    }, (error) => {
      console.log('error' + error)
    })
  }

  ngOnInit() {
    console.log(this.authService.getToken())
    if(this.authService.verifyToken()){
      this.userName = this.authService.decodeToken()['name']
      return this.userIsAuthenticated = true
    }
    this.userIsAuthenticated = false
  }

  // ngOnInit() {
  //   this.userIsAuthenticated = this.UserService.getIsAuth();
  //   this.authListenerSubs = this.UserService
  //     .getAuthStatusListener()
  //     .subscribe(isAuthenticated => {
  //       this.userIsAuthenticated = isAuthenticated;
  //     });
  // }
  // ngOnDestroy() {
  //   this.authListenerSubs.unsubscribe();
  // }

}
