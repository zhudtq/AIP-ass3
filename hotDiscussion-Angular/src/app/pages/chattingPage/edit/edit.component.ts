import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetChatByIdService } from '../../../http/get-chat-by-id.service';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [AuthenticationService]
})
export class EditComponent implements OnInit {
  singleCardId: string = ''
  singleChat: any = {}
  imageUrl: string = ''
  myComponentToggle: boolean = false

  likesToggle: boolean = false

  constructor(private activatedRouter: ActivatedRoute, private fetchChatService: GetChatByIdService, private authService: AuthenticationService, 
    private toaster: ToastrService) {}

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

  edit(){
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
    this.toaster.warning('Only administrator can use this function', 'Authority warning')
  }

}
