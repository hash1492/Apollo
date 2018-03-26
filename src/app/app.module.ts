import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule
} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";


import { AppComponent } from './app.component';
import { ShellComponent } from './shell/shell.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../app/video/video.service';
import { AuthGuardService } from "../app/auth/auth-guard.service";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ChatDashboardComponent } from './chat-dashboard/chat-dashboard.component';
import { UsersListComponent } from './chat-dashboard/users-list/users-list.component';
import { ChatsListComponent } from './chat-dashboard/chats-list/chats-list.component';
import { ChatBoxComponent } from './chat-dashboard/chat-box/chat-box.component';
import { ChatListItemComponent } from './chat-dashboard/chats-list/chat-list-item/chat-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ChatDashboardComponent,
    UsersListComponent,
    ChatsListComponent,
    ChatBoxComponent,
    ChatListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [VideoService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
