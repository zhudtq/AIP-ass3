import { Component, OnInit } from '@angular/core';
import { UploadProfileService } from '../../../http/upload-profile.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { Observable, interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UploadProfileService, AuthenticationService]
})
export class ProfileComponent implements OnInit {
fileData: File = null;
userId = '';
imageUrl;
updateSubscription: Subscription;

constructor(private http: HttpClient, private uploadProfileService: UploadProfileService, private authService: AuthenticationService) { 
}
 

onFilePicked(event){
 console.log("onfilepicked event")
 if (event.target.files[0]){
    this.fileData = <File>event.target.files[0];
    console.log(this.fileData);
 }
}

onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.fileData);
    this.uploadProfileService.uploadImage(formData)
      .subscribe((data) => {
                console.log('success')
                alert('upload!')
                console.log(data)
              },
              (error) => {
                alert('fail'+ error)
                console.log(error);
              })
             
      };
      
getUserId(){
  if(this.authService.verifyToken()){
    this.userId = this.authService.decodeToken()["_id"]
  }
  //console.log(this.userId)
}


// showAvatar(){
    // this.uploadProfileService.getAvatar(this.userId).subscribe((data) => {
    //   // let imageBase64String= btoa(data);
    //   // this.imageUrl = 'data:image/jpeg;base64,' + imageBase64String;
    //   this.imageUrl = 'http://localhost:3000'+'/users/'+this.userId+'/avatar/';
    //     alert('sucess')
    //     console.log(data)
    //   },
    //   (error) => {
    //     alert('fail'+ error)
    //     console.log(error);
    //   });
  // }
  getUrl(){
    this.uploadProfileService.getAvatar(this.userId);
  
        this.imageUrl = 'http://localhost:3000'+'/users/'+this.userId+'/avatar/';
    
      // let imageBase64String= btoa(data);
      // this.imageUrl = 'data:image/jpeg;base64,' + imageBase64String;
      // this.imageUrl = 'http://localhost:3000'+'/users/'+this.userId+'/avatar/';
        //alert('sucess')
        //console.log(data)

    //this.imageUrl = 'http://localhost:3000'+'/users/'+this.userId+'/avatar/';
  }

  
  ngOnInit() {
    this.getUserId();
    this.getUrl();
    }
      

}
