import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';


import { AppComponent } from './app.component';
import { LogInComponent } from './pages/loginPage/log-in/log-in.component';
import { LogoComponent } from './pages/loginPage/logo/logo.component';
import { MainChattingComponent } from './pages/chattingPage/main-chatting/main-chatting.component';
import { SignupComponent } from './pages/signupPage/signup/signup.component';
import { NavigationComponent } from './pages/chattingPage/navigation/navigation.component';
import { UserService } from './pages/user.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LogoComponent,
    MainChattingComponent,
    SignupComponent,
    NavigationComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
