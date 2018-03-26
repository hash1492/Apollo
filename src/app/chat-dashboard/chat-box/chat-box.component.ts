import { Component, OnInit, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { firebaseAuth, chatsCollection, usersCollection, messagesCollection } from "../../firebase/firebase.config";

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, AfterViewChecked {
  @Input() chatDetails;
  message = '';
  messages = [];
  constructor() { }

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  ngOnInit() { 
      this.scrollToBottom();
  }

  ngAfterViewChecked() {        
      this.scrollToBottom();        
  } 

  sendMessage() {
    console.log('sendMessage called');
    console.log(this.message);
    var message = {
      text: this.message,
      timeCreated: new Date(),
      userId: firebaseAuth.currentUser.uid,
      chatId: this.chatDetails.id
    }
    console.log(message);
    
    messagesCollection.add(message)
    .then(response => {
      console.log(response);
      this.message = '';
    })
    .catch(err => {
      console.log(err);
      
    })
  }

  isMyMessage(msg) {
    return msg.userId === firebaseAuth.currentUser.uid;
  }

  // Scroll chat container to bottom 
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
