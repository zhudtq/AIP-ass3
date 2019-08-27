import { Component, OnInit } from '@angular/core';
import { User } from "../../../models/signup/user.model";
import { NgForm, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../../http/signup/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  user: User;
  
  // Reactive form builder with a built-in email validation
  signupForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private userService: UserService,private formBuilder: FormBuilder,
    private router: Router) { }

    ngOnInit() {
  }
    onSubmit(){
      this.buildUserModel()
    }

    get usernameController() {
      return this.signupForm.get('name');
    }

    get emailController() {
      return this.signupForm.get('email');
    }
  
    get passwordController() {
      return this.signupForm.get('password');
    }

    buildUserModel(){
      if(this.signupForm.status == 'VALID'){
        this.user = {
          name: this.signupForm.value.name,
          email: this.signupForm.value.email, 
          password: this.signupForm.value.password
        }
  
        this.userService.registerUser(this.user).subscribe(
          (data) => {
            console.log('success')
            alert('You are signed up! Please login')
            this.router.navigate(['/login'])
          },
          (error) => {
            alert(' please check ')
            this.signupForm.reset()
          }
        )
      }
  
    }
}
