import { Component, OnInit, Input } from '@angular/core';
import { Location } from "@angular/common";
import { EditPostButtonService } from '../../../http/edit-post-button-service';
import {PostModel} from "../../../models/postModel";
import { TransferSingleCardService } from "../../../commonServices/transfer-single-card.service";
import { HostUrlService } from '../../../http/host-url.service';

@Component({
  selector: 'app-edit-post-button',
  templateUrl: './edit-post-button.component.html',
  styleUrls: ['./edit-post-button.component.css']
})
export class EditPostButtonComponent implements OnInit {
  singleCardList: any = {};
  findSinglePost: PostModel;
  mainImageId:""
  mainImageSplit:string[]
  imageFolderName:string
  changedPictureUrl:string = ''
  constructor(
    private location: Location, private transferService: TransferSingleCardService, 
    private editService: EditPostButtonService, private hostUrlSerivce: HostUrlService
  ) {}


  // Function to go back to previous page
  goBack() {
    this.location.back();
  }
  updateBlogSubmit(){
    this.mainImageId = this.singleCardList.mainImage.toString()
    console.log(this.mainImageId)
    if(this.singleCardList != {}){
      this.mainImageSplit=this.mainImageId.split("http://localhost:3000/")
      // this.imageFolderName=this.mainImageSplit[3]
      let fodlerPath = this.mainImageSplit[1].split("/main.jpg")[0]
      console.log(fodlerPath)
      this.editService.postImageId(fodlerPath).subscribe((data) => {
        console.log('cheng gong')
        console.log(data)
      }, (errir) => {
        console.log('shi bai')
      })
    }
  }

  ngOnInit() {
    this.singleCardList = this.transferService.singleCard
    console.log(this.singleCardList)
  }


}
