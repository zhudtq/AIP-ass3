import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  /*loginForm = new FormGroup(
    {
      email: new FormControl(''),
      password: new FormControl('')
    }
  );*/

  // Reactive form builder with a built-in email validation
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

  // Reactive form submission function
  onSubmit() {
    console.log(this.loginForm.status);
    console.log(this.loginForm.value);
    //console.log(this.emailController)
  }

  get emailController() {
    return this.loginForm.get('email');
  }

}
