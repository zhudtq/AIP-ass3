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
                this.getUrl();   
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
    //console.log(data)
    //console.log(this.imageUrl)
  }, (error) => {
    this.imageUrl = 'bg3.png';
    console.log('error')
  })      
}

ngOnInit() {
  this.getUserId();
  this.getUrl();
  }
      

}
