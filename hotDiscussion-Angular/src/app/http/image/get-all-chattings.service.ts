import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostUrlService } from '../host-url/host-url.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllChattingsService {

  constructor(private http: HttpClient, private hostUrlSerivce: HostUrlService) {}

  baseUrl = this.hostUrlSerivce.hostURL ;


  getAllChattings(){

    return this.http.get(this.baseUrl + '/chats/')
  }
  // get all chats' length and helps pagination
  getChatsLength(){
    return this.http.get(this.baseUrl + '/chatsLength/')
  }
// reference at https://stackoverflow.com/questions/34475523/how-to-pass-url-arguments-query-string-to-a-http-request-on-angular
  // pagination service
  goToNewPage(pageNum){
    let params: URLSearchParams = new URLSearchParams();
    params.set('page', pageNum);

    //Http request-
    return this.http.get(this.baseUrl +'/chats/',
      {
      params: {
        page: pageNum,
      }
    })

  }

}
