import { Component, OnInit } from '@angular/core';
import { GetAllChattingsService } from '../../../http/get-all-chattings.service';

@Component({
  selector: 'app-chatting-card',
  templateUrl: './chatting-card.component.html',
  styleUrls: ['./chatting-card.component.css'],
  providers: [GetAllChattingsService]
})
export class ChattingCardComponent implements OnInit {
  mainChattingList: any = []
  imagePath: String = "file:/balloon.jpg"

  constructor(private getAllChatting: GetAllChattingsService) {}

  ngOnInit() {
    this.getAllChatting.getAllChattings().subscribe(
      (data) => {
        this.mainChattingList = data
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
