import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PicRankingService} from '../../../../http/pic-ranking.service';

@Component({
  selector: 'app-pic-ranking',
  templateUrl: './pic-ranking.component.html',
  styleUrls: ['./pic-ranking.component.css']
})
export class PicRankingComponent implements OnInit {

  imageUrl: any [];
  
  topicRankingList;

  constructor(private http: HttpClient, private picRankingService: PicRankingService) { }

  getUrl(){
    this.picRankingService.getPicRanking().subscribe((data)=> {
      console.log(data)
      this.topicRankingList = data;
    }, (error) => {
      console.log('error')
    })      
  }

  ngOnInit() {
    this.getUrl();
  }

}
