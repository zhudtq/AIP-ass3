import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadProfileService } from '../../../http/upload-profile.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UploadProfileService, AuthenticationService]
})
export class ProfileComponent implements OnInit {
fileData: File = null;
userId = '';
image;
imageUrl;
updateSubscription: Subscription;

constructor(private http: HttpClient, private uploadProfileService: UploadProfileService, 
  private authService: AuthenticationService) { 
}

onFilePicked(event){
 console.log("onfilepicked event")
 if (event.target.files[0]){
    this.fileData = <File>event.target.files[0];
 }
}

onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.fileData);
    this.uploadProfileService.uploadImage(formData)
      .subscribe((data) => {
                alert('Upload!')
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
}

// Reference to solution of https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5
createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
    this.imageUrl = reader.result;
    this.image = image;
    this.uploadProfileService.showImage(this.image);
  }, false);
  if (image) {
    reader.readAsDataURL(image);
  }
}

getUrl(){
  this.uploadProfileService.getAvatar(this.userId).subscribe((data)=> {
    this.createImageFromBlob(data);
    this.image = data;
    console.log(this.image);
    
  }, (error) => {
    this.imageUrl = 'bg1.png';
    console.log('error')
  })      
}

ngOnInit() {
  this.getUserId();
  this.getUrl();
  }
}