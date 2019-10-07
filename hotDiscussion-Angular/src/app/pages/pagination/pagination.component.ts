import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { GetAllChattingsService } from '../../http/get-all-chattings.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  chatsLength: any = []
  len = 0
  numOfPage
  filtedData: any = []
  @Output() paginationEvent = new EventEmitter()
  constructor(private getAllChatting: GetAllChattingsService) { }

  getAllChatsLength() {
    this.getAllChatting.getChatsLength().subscribe(
      (data) => {
        this.chatsLength = data
        this.len = this.chatsLength.Len
        this.caculatePageNum(this.len)
        this.getArrayFromNumber(this.numOfPage)
      },
      (error) => {
        window.alert(error)
      }
    )
  }
  caculatePageNum(length){
    this.numOfPage =  Math.ceil(length / 10);
    return this.numOfPage

  }
  getArrayFromNumber(numOfPage){

    return new Array(numOfPage);

  }
  goToPage(num){
    this.getAllChatting.goToNewPage(num).subscribe(
      (data) => {
        this.filtedData = data
        this.paginationEvent.emit(this.filtedData)
      },
      (error) => {
        console.log(error)
      }
    )

  }
  ngOnInit() {
    this.getAllChatsLength()

  }

}
