import { Component, OnInit } from '@angular/core';
import { UploadProfileService } from '../../../http/upload-profile.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  fileData: File = null;
constructor(private http: HttpClient, private uploadProfileService: UploadProfileService) { }
 

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
              },
              (error) => {
                alert('fail'+ error)
                console.log(error);
              })
      };


  
  ngOnInit() {
  }

}
