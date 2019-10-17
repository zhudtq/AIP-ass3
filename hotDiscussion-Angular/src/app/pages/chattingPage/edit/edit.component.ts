import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetChatByIdService } from '../../../http/image/get-chat-by-id.service';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../../../http/image/comment.service';
import { Emoji } from './emoji';
import { SendEmojiService } from '../../../http/image/send-emoji.service'
import {DeleteService} from "../../../http/image/delete.service";
import { Location } from "@angular/common";

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
  emojiToggle: boolean = false
  emojiModel: any = {}
  shownEmoji: string = ''

  // where online emoji urls sotred
  emojiList = new Emoji().emojiList
  colorPicked: string = 'rgb(255, 255, 255)'
  pickedEmoji: string = ''

  chnagePicUrl: string = ''
  currentName = '';
  isAuth = false
  isAuthAdmin = false;
  constructor(private activatedRouter: ActivatedRoute, private fetchChatService: GetChatByIdService, private authService: AuthenticationService,
    private toaster: ToastrService, private commentService: CommentService,private deleteService:DeleteService,private location: Location,private emojiService: SendEmojiService) {}

  ngOnInit() {
    this.getChat()
    this.isAdmin()
  }

  getIdValue(){
    this.singleCardId = this.activatedRouter.snapshot.paramMap.get('id')
    return this.singleCardId
  }

  // get image from server as well as its comments and likes
  getChat() {
    this.fetchChatService.getChat(this.getIdValue()).subscribe((data)=> {
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

  showEmoji() {
    if (this.emojiToggle == false){
      if (this.authService.verifyToken()){
        return this.emojiToggle = true
      }
      this.toaster.info('Please log in to comment', 'Authentication falled')
    }
    if (this.emojiToggle == true) {
      this.emojiToggle = false
    }
  }

  confirmEmoji(i: any) {
    this.emojiList[i].toggle = true
    this.shownEmoji = this.emojiList[i].url
    for (let x = 0; x < this.emojiList.length; x++) {
      if (x != i) {
        this.emojiList[x].toggle = false
      }
    }
    this.pickedEmoji = this.emojiList[i].url
  }

  clearEmoji() {
    this.pickedEmoji = ''
    this.shownEmoji = ''
    for (let i = 0; i < this.emojiList.length; i++) {
      this.emojiList[i].toggle = false
    }
    this.emojiToggle = false
  }

  // Sengd selected emoji to server
  sendEmoji() {
    if (this.pickedEmoji == '') {
      return this.toaster.info('No emoji picked', 'Infor')
    }
    if (this.authService.getToken() == '') {
      return this.toaster.info('Please log in to send emoji', 'Authentication failed')
    }
    let commenter = this.authService.decodeToken()['name']
    this.emojiModel.commenter = commenter
    this.emojiModel.url = this.pickedEmoji
    this.emojiModel.id = this.singleChat._id

    this.emojiService.postEmoji(this.emojiModel).subscribe((data)=> {
      this.toaster.success('Emoji sent successfully', 'Success')
      this.clearEmoji()
      this.getChat()
    }, (error) => {
      this.toaster.error(error.message, 'Error')
    })
  }

  deleteEmoji() {
    this.pickedEmoji = '';
    this.shownEmoji = '';
  }

  // delete id-specified chatting image
  delete() {

    this.deleteService.postDeletedImageId(this.singleChat._id).subscribe((data) => {
      this.toaster.success(data['success'], 'Delete successfully')
      this.goBack()
    }, (error) => {
      this.toaster.error(error.message, 'Error')
    })
  }

  buildCommentUrl() {
    this.commentUrl = this.commentService.baseUrl + '/' + this.getIdValue() + '/' + this.singleChat.path
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

  changePic(){
    this.fetchChatService.getChat(this.getIdValue()).subscribe((data)=> {
      console.log(data)
      this.singleChat = data
      this.imageUrl = data['mainImage']
      window.location.reload()
    }, (error)=> {
      console.log(error)
    })
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
    }
    return this.isAuth
  }
  isAdmin(){
    this.isAuthAdmin = this.authService.verifyAdmin()
    return this.isAuthAdmin
  }
}
