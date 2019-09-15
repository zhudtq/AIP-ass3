import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {Router, ActivatedRoute} from "@angular/router";
import { EditPostButtonService } from '../../../http/edit-post-button-service';
import {PostModel} from "../../../models/postModel";

@Component({
  selector: 'app-edit-post-button',
  templateUrl: './edit-post-button.component.html',
  styleUrls: ['./edit-post-button.component.css']
})
export class EditPostButtonComponent implements OnInit {
  findSinglePost: PostModel;

  constructor(
    private location: Location
  ) {}


  // Function to go back to previous page
  goBack() {
    this.location.back();
  }
  updateBlogSubmit(){

  }

  ngOnInit() {

  }


}
