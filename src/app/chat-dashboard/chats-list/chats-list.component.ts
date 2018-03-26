import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { firebaseAuth, chatsCollection, usersCollection } from "../../firebase/firebase.config";

@Component({
  selector: 'app-chats-list',
  templateUrl: './chats-list.component.html',
  styleUrls: ['./chats-list.component.css']
})
export class ChatsListComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<Object>();
  @Input() selectedChat;
  chats = [];   
  constructor() { }

  ngOnInit() {
    var self = this;
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        var currentUserName = JSON.parse(localStorage.getItem('currentUser')).name;
        chatsCollection
        .where('users.' + currentUserName ,'==', true)
        .onSnapshot(function (querySnapshot) {
          self.chats = [];
          querySnapshot.forEach(function (doc) {
            self.chats.push(doc.data())
          })
          self.chats.forEach(chat => {
            for (const userName in chat.users) {
              if (chat.users.hasOwnProperty(userName) && userName !== currentUserName) {
                chat.otherUserName = userName;
              }
            }
          })
          console.log(self.chats)
        })
      } else {
        // No user is signed in.
      }
    });

  }

  

  openChat(event, chat) {
    event.preventDefault();
    console.log(chat);
    this.chatSelected.emit(chat);    
  }
}
