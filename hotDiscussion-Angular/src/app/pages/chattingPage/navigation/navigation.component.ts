import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../http/signup/user.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy{

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private UserService: UserService) { }

  ngOnInit() {
    this.userIsAuthenticated = this.UserService.getIsAuth();
    this.authListenerSubs = this.UserService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onLogout(){
    this.UserService.logout();
  }
}
