import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetChatByIdService } from '../../../http/get-chat-by-id.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  singleCardId: string = ''
  singleChat: any = {}
  imageUrl: string = ''
  commentList = [1,2]

  likesToggle: boolean = false

  constructor(private activatedRouter: ActivatedRoute, private fetchChatService: GetChatByIdService) {}

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
      this.imageUrl = this.singleChat.mainImage
    }, (error)=> {
      console.log(error)
    })
  }

}
