import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetChatByIdService } from '../../../http/get-chat-by-id.service';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../../../http/image/comment.service';
import {DeleteService} from "../../../http/delete.service";
import { Location } from "@angular/common";
// import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [AuthenticationService, CommentService]
})
export class EditComponent implements OnInit {
  singleCardId: string = ''
  singleChat: any = {}
  imageUrl: string = ''
  myComponentToggle: boolean = false
  changePicToggle:boolean = false
  likesToggle: boolean = false
  commentUrl: string = ''
  chnagePicUrl: string = ''
  currentName = '';
  isAuth = false
  constructor(private activatedRouter: ActivatedRoute, private fetchChatService: GetChatByIdService, private authService: AuthenticationService,
    private toaster: ToastrService, private commentService: CommentService,private deleteService:DeleteService,private location: Location) {}

  ngOnInit() {
    this.getChat()
  }

  getIdValue(){
    this.singleCardId = this.activatedRouter.snapshot.paramMap.get('id')
    return this.singleCardId
  }

  getChat() {
    this.fetchChatService.getChat(this.getIdValue()).subscribe((data)=> {
      console.log(data)
      this.singleChat = data
      this.imageUrl = data['mainImage']
    }, (error)=> {
      console.log(error)
    })
  }

  comment(){
    this.buildCommentUrl()
    if (this.myComponentToggle == false){
      if (this.authService.verifyToken()){
        return this.myComponentToggle = true
      }
      this.toaster.info('Please log in to comment', 'Authentication falled')
    }
    if (this.myComponentToggle == true) {
      this.myComponentToggle = false
    }
  }

  delete() {


    // this.toaster.warning('Only administrator can use this function', 'Authority warning')
    this.deleteService.postImageId(this.singleChat._id).subscribe((data) => {
      this.toaster.success(data['success'], 'Delete successfully')
      this.goBack()
    }, (error) => {
      this.toaster.error(error.message, 'Error')
    })
  }

  buildCommentUrl() {
    this.commentUrl = this.commentService.baseUrl + '/' + this.getIdValue() + '/' + this.singleChat.path
    // console.log(this.commentUrl)
  }
  goToChangePic() {
    this.chnagePicUrl = this.commentService.changePicUrl + '/' + this.singleChat.path
    if (this.changePicToggle == false){
      if (this.authService.verifyToken()){
        return this.changePicToggle = true
      }
      this.toaster.info('Please log in to edit', 'Authentication falled')
    }
    if (this.changePicToggle == true) {
      this.changePicToggle = false
    }

  }

  goBack() {
    this.location.back();
  }
  isAuthOwner(){
    if(this.authService.verifyToken()){
      this.currentName = this.authService.decodeToken()['name']
        if (this.singleChat.ownerName == this.currentName) {
          this.isAuth = true
        }
        // console.log(this.currentName)
        // console.log("hahhahahahaha"+this.singleChat.ownerName)
    }
    return this.isAuth
  }
  isAdmin(){
    this.authService.verifyAdmin()
  }
}
