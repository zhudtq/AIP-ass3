import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../http/signup/user.service';
import { Subscription } from "rxjs";
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { LogoutService } from '../../../http/logout.service';
import { ToastrService } from 'ngx-toastr';
import { UploadProfileService } from '../../../http/upload-profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthenticationService, LogoutService]
})
export class NavigationComponent implements OnInit{

  userIsAuthenticated = false;
  userName = '';
  userId = '';
  imageUrl;
  // private authListenerSubs: Subscription;

  constructor(private UserService: UserService, private authService: AuthenticationService,
    private logoutService: LogoutService, private toastrService: ToastrService,
    private uploadProfileService: UploadProfileService, private http: HttpClient) { }

  onLogout(){
    this.logoutService.logoutAll().subscribe(()=> {
      this.logoutService.clearToken()
      this.userIsAuthenticated = false;
      this.toastrService.success('Log out successfully', 'Success')
    }, (error) => {
      console.log('error' + error)
    })
  }
  getUserId(){
    if(this.authService.verifyToken()){
      this.userId = this.authService.decodeToken()["_id"]
    }
    //console.log(this.userId)
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getUrl(){
    this.uploadProfileService.getAvatar(this.userId).subscribe((data)=> {
      this.createImageFromBlob(data);
    }, (error) => {
      this.imageUrl = 'bg1.png';
      console.log('error')
    })      
  }

  ngOnInit() {
    this.getUserId();
    this.getUrl();
    console.log(this.authService.getToken())
    if(this.authService.verifyToken()){
      this.userName = this.authService.decodeToken()['name']
      return this.userIsAuthenticated = true
    }
    this.userIsAuthenticated = false
    
    
  }

  
  

}
