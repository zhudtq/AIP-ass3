import { Component, OnInit } from '@angular/core';
import { User } from "../../user.model";
import { NgForm } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // user: User;
  user:User = {
    UserName: "",
    Password: "",
    Email: ""
  }

  constructor(private userService: UserService) { }

    ngOnInit() {
  }
    ngSubmit(){

    }

}
