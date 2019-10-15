import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetChatByIdService } from '../../../http/get-chat-by-id.service';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../../../http/image/comment.service';
import { Emoji } from './emoji';
import { SendEmojiService } from '../../../http/image/send-emoji.service'

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
  emojiToggle: boolean = false
  emojiModel: any = {}
  shownEmoji: string = ''

  // emojiList = ['https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/smiling-face.png','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9nArEfJZVe0hIgJNWwHPKIPXNR1K6kTavmiO0n7WIhL-8Ae4H',
  // 'https://cdn.shortpixel.ai/client/q_glossy,ret_img,w_300/https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji-300x300.png', 'https://blob.freent.de/image/6292650/460x307/460/307/b0/b080359f27915525f74574d94a56a510/SV/auf-dem-boden-rollen-png.png',
  // 'https://cdn0.iconfinder.com/data/icons/smiley-10/100/Poop-512.png', 'https://s-media-cache-ak0.pinimg.com/736x/31/fb/09/31fb09b4799d8d5ba2821d93303517b5.jpg',
  // 'https://cdn.shopify.com/s/files/1/1061/1924/products/12_large.png?v=1544200561', 'https://cdn.shopify.com/s/files/1/1061/1924/products/Sleeping_Emoji_large.png?v=1480481055',
  // 'https://pngimage.net/wp-content/uploads/2018/06/twitch-emotes-png-6.png', 'http://cdn.shopify.com/s/files/1/1573/4081/products/pogchamp_fullrescrop_grande.png?v=1564717685']
  emojiList = new Emoji().emojiList
  colorPicked: string = 'rgb(255, 255, 255)'
  pickedEmoji: string = ''
  // #f9ca24 rgb(255, 255, 255)

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
    // console.log(this.pickedEmoji)
    // console.log(this.emojiList)
  }

  // moveIn(i: any){
  //   this.shownEmoji = this.emojiList[i].url
  // }

  // moveOut(){
  //   this.shownEmoji = ''
  // }

  clearEmoji() {
    this.pickedEmoji = ''
    this.shownEmoji = ''
    for (let i = 0; i < this.emojiList.length; i++) {
      this.emojiList[i].toggle = false
    }
    this.emojiToggle = false
  }

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
