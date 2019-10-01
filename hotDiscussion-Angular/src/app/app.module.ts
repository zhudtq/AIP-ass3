import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { LogInComponent } from './pages/loginPage/log-in/log-in.component';
import { LogoComponent } from './pages/loginPage/logo/logo.component';
import { MainChattingComponent } from './pages/chattingPage/main-chatting/main-chatting.component';
import { SignupComponent } from './pages/signupPage/signup/signup.component';
import { NavigationComponent } from './pages/chattingPage/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRankingComponent } from './pages/chattingPage/main-chatting/user-ranking/user-ranking.component';
import { PicRankingComponent } from './pages/chattingPage/main-chatting/pic-ranking/pic-ranking.component';
import { ChattingCardComponent } from './pages/chattingPage/chatting-card/chatting-card.component';
import { ImageUploadComponent } from './pages/chattingPage/image-upload/image-upload.component';

import { ProfileComponent } from './pages/chattingPage/profile/profile.component';
import { EditComponent } from './pages/chattingPage/edit/edit.component';
// import {EditPostButtonComponent} from "./pages/chattingPage/edit-post-button/edit-post-button.component";

export function tokenGetter() {
  return sessionStorage.getItem('StrawberryToken')
}

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    LogoComponent,
    MainChattingComponent,
    SignupComponent,
    NavigationComponent,
    UserRankingComponent,
    PicRankingComponent,
    ChattingCardComponent,
    ImageUploadComponent,
    ProfileComponent,
    EditComponent
    // EditPostButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:3000"]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
