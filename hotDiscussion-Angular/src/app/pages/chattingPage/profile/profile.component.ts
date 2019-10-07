import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UploadProfileService } from '../../../http/upload-profile.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NG_FORM_SELECTOR_WARNING } from '@angular/forms/src/directives';

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
pitch: string = "";
btnToggle: boolean = true;

constructor(private http: HttpClient, private uploadProfileService: UploadProfileService, 
  private authService: AuthenticationService, private toastr: ToastrService) { 
}


onFilePicked(event){
 if (event.target.files[0]){
  this.btnToggle = true
    this.fileData = <File>event.target.files[0];
    this.pitch = ""

      let size = Number(this.fileData.size)
      let type = this.fileData.type
      if (size > 2000000) {
        this.toastr.warning('The image size should be less than 2MB', 'Image Oversize')
        this.fileData = null
        this.btnToggle = true
        return
      }
      if (type != 'image/jpeg' && type != 'image/jpg' && type != 'image/png') {
        this.fileData = null
        this.btnToggle = true
        this.toastr.warning('Only png, jpg or jpeg image formats are accepted', 'Type error')
        return
      }
      this.btnToggle = false
 }
 else {
  this.pitch = "* No file selected, please select a file to upload"
  this.fileData = null
}
}

onSubmit() {
    const formData = new FormData();
    if (!this.fileData){
      return this.toastr.info('No file picked', 'Infor')
    }
    if(this.fileData){
      formData.append('avatar', this.fileData);
    }
    
    this.uploadProfileService.uploadImage(formData)
      .subscribe((data) => {
        this.toastr.success('Your profile has been successfully uploaded', 'Success')
                this.fileData = null
                this.getUrl();  
              },
              (error) => {
                alert('fail'+ error)
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
    // console.log(this.image);
    
  }, (error) => {
    this.imageUrl = 'bg1.png';
    // console.log('error')
  })      
}

ngOnInit() {
  this.getUserId();
  this.getUrl();
  }
}