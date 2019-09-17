import { Component, OnInit } from '@angular/core';
import { UploadProfileService } from '../../../http/upload-profile.service';
import { HttpClient } from '@angular/common/http';

// class ProfilePhoto {
  
//   constructor(public file: File) {}
// }

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  //selectedFile: ProfilePhoto; 
  fileData: File = null;
constructor(private http: HttpClient, private uploadProfileService: UploadProfileService) { }
 
// fileProgress(fileInput: any) {
//     this.fileData = <File>fileInput.target.files[0];
// }

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
    //return this.http.post('http://localhost:3000/users/me/avatar', formData)
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
  // processFile(imageInput: any) {
  //   let file: File = imageInput.files[0];
  //   const reader = new FileReader();

  //   //reader.addEventListener('load', (event: any) => {

  //     //this.selectedFile = new ProfilePhoto(file);
  //     let imageFile = new FormData();
  //     imageFile.append('image', file)

  //     this.uploadProfileService.uploadImage(imageFile).subscribe(
  //       (data) => {
  //         console.log('success')
  //         alert('upload!')
  //       },
  //       (error) => {
  //         alert('fail'+ error)
  //         console.log(error);
  //       })
  //   };

    //reader.readAsDataURL(file);
  //}
}
