import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ProfileService } from '../../../http/profile/profile.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ProfileService, AuthenticationService]
})
export class ProfileComponent implements OnInit {
fileData: File = null;
userId = '';
image;
imageUrl;
updateSubscription: Subscription;
pitch: string = "";
btnToggle: boolean = true;

constructor(private http: HttpClient, private ProfileService: ProfileService, 
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
    formData.append('profile', this.fileData)
  }
  
  this.ProfileService.uploadImage(formData)
    .subscribe((data) => {
      this.toastr.success('Your profile has been successfully uploaded', 'Success')
              this.fileData = null
              this.getUrl()
            },
            (error) => {
              alert('fail'+ error)
            })       
    };

// Get user ID number via authService
getUserId(){
  if(this.authService.verifyToken()){
    this.userId = this.authService.decodeToken()["_id"]
  }
}

// Get the profile image URL served up by createImageFromBlob() function
getUrl(){
  this.ProfileService.getProfile(this.userId).subscribe((data)=> {
    this.createImageFromBlob(data);
    this.image = data
  }, (error) => {
    this.imageUrl = 'bg1.png'
  })      
}

// Read Blob format image as binary data to serve image up
// Reference to solution of https://stackoverflow.com/questions/45530752/getting-image-from-api-in-angular-4-5
createImageFromBlob(image: Blob) {
  let reader = new FileReader()
  reader.addEventListener("load", () => {
    this.imageUrl = reader.result
    this.image = image
    this.ProfileService.showImage(this.image)
  }, false);
  if (image) {
    reader.readAsDataURL(image)
  }
}

ngOnInit() {
  this.getUserId()
  this.getUrl()
  }
}