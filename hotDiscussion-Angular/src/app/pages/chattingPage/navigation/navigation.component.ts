import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { LogoutService } from '../../../http/logout/logout.service';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from '../../../http/profile/profile.service';
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

  constructor(private authService: AuthenticationService,
    private logoutService: LogoutService, private toastrService: ToastrService,
    private ProfileService: ProfileService, private http: HttpClient,) { 

      // Subscribe the change of profile iamge via ProfileService
      this.ProfileService.listen().subscribe((image:any) => {
        this.createImageFromBlob(image);
    })
    }
  
  // User logout with authentication
  onLogout(){
    this.logoutService.logoutAll().subscribe(()=> {
      this.logoutService.clearToken()
      this.userIsAuthenticated = false
      this.toastrService.success('Log out successfully', 'Success')
    }, (error) => {
      console.log('error' + error)
    })
  }

  // Get user ID number via authService
  getUserId(){
    if(this.authService.verifyToken()){
      this.userId = this.authService.decodeToken()["_id"]
    }
  }

  // Get the profile image URL served up by createImageFromBlob() function
  getUrl(){
    this.ProfileService.getProfile(this.userId).subscribe((data)=> {
      this.createImageFromBlob(data)
    }, (error) => {
      this.imageUrl = 'bg1.png'
      console.log('error')
    })      
  }
  
  // Read Blob format image as binary data to serve image up
  // Reference to solution of https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5
  createImageFromBlob(image: Blob) {
    let reader = new FileReader()
    reader.addEventListener("load", () => {
      this.imageUrl = reader.result
    }, false);
    if (image) {
      reader.readAsDataURL(image)
    }
  }

  ngOnInit() {
    this.getUserId()
    this.getUrl()
    
    // Get user name via authService
    if(this.authService.verifyToken()){
      this.userName = this.authService.decodeToken()['name']
      return this.userIsAuthenticated = true
    }
    this.userIsAuthenticated = false
  }
}