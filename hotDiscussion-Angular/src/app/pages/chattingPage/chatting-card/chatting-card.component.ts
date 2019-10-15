import { Component, OnInit, Input, HostListener, ViewChild, ElementRef} from '@angular/core';
import { GetAllChattingsService } from '../../../http/get-all-chattings.service';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { TransferSingleCardService } from "../../../commonServices/transfer-single-card.service";
import { Router } from '@angular/router';
import { UploadMainChattingService } from '../../../http/image/upload-main-chatting.service';
import { LikeButtonService } from "../../../http/like-button-service";
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-chatting-card',
  templateUrl: './chatting-card.component.html',
  styleUrls: ['./chatting-card.component.css'],
  providers: [GetAllChattingsService,AuthenticationService]
})
export class ChattingCardComponent implements OnInit {

  mainChattingList: any = []
  cardId=''
  mainImageUrl: string = ''
  @ViewChild(PaginationComponent) pagChild: PaginationComponent;

  constructor(private getAllChatting: GetAllChattingsService,private authService: AuthenticationService,
              private transferService: TransferSingleCardService,private likeButtonService:LikeButtonService, private router: Router,
              private uploadMainImage: UploadMainChattingService) {}

  goToEditPage(id) {
    this.router.navigate(['/mainChatting/edit', id])
  }

  transferValue(myIndex: any){
    this.transferService.singleCard = this.mainChattingList[myIndex]
  }
  // judge if the current login user is the user who post the picture
    addAuth(){
      for (let n = 0; n < this.mainChattingList.length; n ++){
        this.mainChattingList[n].isAuth = false;
      }
    }

    getAllChats() {
      this.getAllChatting.getAllChattings().subscribe(
        (data) => {
          this.mainChattingList = data
          this.addAuth()
        },
        (error) => {
          window.alert("Could not fetch all pictures")
        }
      )
      //helps pagination to form how many pages should be presented
      this.pagChild.getAllChatsLength()
    }

  getCardId(myIndex){
    this.cardId = this.mainChattingList[myIndex]._id
  }
  like(cardIndex){
    this.getCardId(cardIndex)
      this.likeButtonService.likeImageId(this.cardId).subscribe((data) => {
        this.mainChattingList[cardIndex].likes = data['likes']
      }, (error) => {
        window.alert("Can not find people who have liked this post")
      })
  }
  sortByLikes(){

  }
  sortByNew(){

  }
  ngOnInit() {
    this.mainImageUrl = this.uploadMainImage.baseUrl;
    this.getAllChats()

  }

  clickLink(e: any) {
    this.mainChattingList = e
  }


}
