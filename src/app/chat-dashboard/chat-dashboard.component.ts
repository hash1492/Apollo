import { Component, OnInit } from '@angular/core';
import { firebaseAuth, chatsCollection, usersCollection, messagesCollection } from "../firebase/firebase.config";

@Component({
  selector: 'app-chat-dashboard',
  templateUrl: './chat-dashboard.component.html',
  styleUrls: ['./chat-dashboard.component.css']
})
export class ChatDashboardComponent implements OnInit {
  selectedChat = {}
  activeTab = 'Chats';
  
  constructor() { }

  ngOnInit() {
  }

  openChat(chat) {
    console.log("openChat called", chat);
    this.activeTab = 'Chats';
    var self = this;
    messagesCollection.where("chatId", "==", chat.id)
    .orderBy("timeCreated")
    .onSnapshot(function (querySnapshot) {
      chat.messages = []
      querySnapshot.forEach(function (doc) {
        chat.messages.push(doc.data())
      })
      self.selectedChat = chat;
      console.log(self.selectedChat)
    })
  }

  setActiveTab(e, tabName) {    
    e.preventDefault();
    this.activeTab = tabName
  }
}
