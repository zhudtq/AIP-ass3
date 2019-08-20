import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogInComponent } from './pages/loginPage/log-in/log-in.component';
import { LogoComponent } from './pages/loginPage/logo/logo.component';
import { MainChattingComponent } from './pages/chattingPage/main-chatting/main-chatting.component';
import { SignupComponent } from './pages/signupPage/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LogoComponent,
    MainChattingComponent,
    SignupComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
