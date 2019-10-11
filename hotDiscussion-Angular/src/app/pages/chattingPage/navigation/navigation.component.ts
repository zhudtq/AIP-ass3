import { Component, OnInit} from '@angular/core';
import { UserService } from '../../../http/signup/user.service';
import { Subscription } from "rxjs";
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { LogoutService } from '../../../http/logout/logout.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../http/profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

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

  constructor(private authService: AuthenticationService,
    private logoutService: LogoutService, private toastrService: ToastrService,
    private ProfileService: ProfileService, private http: HttpClient,) { 

      this.ProfileService.listen().subscribe((image:any) => {
        this.createImageFromBlob(image);
    })
    }

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
    this.ProfileService.getAvatar(this.userId).subscribe((data)=> {
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
      this.userName = this.authService.decodeToken()['name'];
      return this.userIsAuthenticated = true;
    }
    this.userIsAuthenticated = false;
  }
}