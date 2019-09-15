import { Component, OnInit } from '@angular/core';
import { GetAllChattingsService } from '../../../http/get-all-chattings.service';
import { AuthenticationService } from '../../../commonServices/authentication.service';
@Component({
  selector: 'app-chatting-card',
  templateUrl: './chatting-card.component.html',
  styleUrls: ['./chatting-card.component.css'],
  providers: [GetAllChattingsService,AuthenticationService]
})
export class ChattingCardComponent implements OnInit {
  // userIsAuthenticated = false;
  currentName = '';
  selectedId = ''
  //
  mainChattingList: any = []
  imagePath: String = "file:/balloon.jpg"

  constructor(private getAllChatting: GetAllChattingsService,private authService: AuthenticationService) {}

  isAuthOwner(){
      if(this.authService.verifyToken()){
        this.currentName = this.authService.decodeToken()['name']
        for(let i =0; i < this.mainChattingList.length; i++) {
          if (this.mainChattingList[i].ownerName == this.currentName) {
            this.mainChattingList[i].isAuth = true
          }
        }
      }
    }

    showId(myIndex){
      console.log(this.mainChattingList[myIndex]._id)
    }

    addAuth(){
      for (let n = 0; n < this.mainChattingList.length; n ++){
        this.mainChattingList[n].isAuth = false;
      }
    }

  ngOnInit() {
    this.getAllChatting.getAllChattings().subscribe(
      (data) => {
        this.mainChattingList = data
        this.addAuth()
        console.log(this.mainChattingList)
        this.isAuthOwner()
      },
      (error) => {
        console.log(error)
      }
    )


  }

}
