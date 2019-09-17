import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogInComponent } from './pages/loginPage/log-in/log-in.component';
import { MainChattingComponent } from './pages/chattingPage/main-chatting/main-chatting.component';
import { SignupComponent } from './pages/signupPage/signup/signup.component';
import { ProfileComponent} from './pages/chattingPage/profile/profile.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LogInComponent},
  {path: 'mainChatting', component: MainChattingComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'profile', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
