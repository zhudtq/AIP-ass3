import { Component, OnInit } from '@angular/core';
import { UserRankingService } from '../../../../http/user-ranking.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrls: ['./user-ranking.component.css']
})
export class UserRankingComponent implements OnInit {
  userRankingList: any = []

  constructor(private http: HttpClient, private userRankingService: UserRankingService) { }

  ngOnInit() {
    this.showRanking();
  }
  
  showRanking(){
    this.userRankingService.getUserRanking().subscribe(
      (data)=> {
        this.userRankingList = data
        // this.showTop(5)
        console.log(data)
      }, (error)=> {
        console.log(error)
      }
    )
  }

  // showTop(index: any){
  //   this.userRankingList.splice(index)
  // }

}
