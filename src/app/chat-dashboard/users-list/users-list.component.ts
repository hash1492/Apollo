import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { usersCollection, chatsCollection, firebaseAuth } from '../../firebase/firebase.config';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  @Output() chatSelected = new EventEmitter<Object>();

  userName = '';
  users = []
  constructor() { }

  ngOnInit() {
  }

  searchUser() {
    var self = this;

    usersCollection
    .where('name', '==', this.userName)
    .get()
    .then(function (querySnapshot) {
      self.users = []
      querySnapshot.forEach(function (doc) {
        // Omit the currently logged in user
        if(doc.data().firebaseAuthId !== firebaseAuth.currentUser.uid){
          self.users.push(doc.data())
        }
      })
      console.log(self.users)
    })
  }


  guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
  }

  openChatWithUser(user) {
    var self = this;
    let userName = user.name;
    let currentUserName = JSON.parse(localStorage.getItem('currentUser')).name;
    let foundChat;
    chatsCollection
    .where('users.' + userName, '==', true)
    .where('users.' + currentUserName, '==', true)
    .get()
    .then(querySnapshot => {
      console.log(querySnapshot);
      querySnapshot.forEach(function (doc) {
        foundChat = doc.data()
      })
      if(!foundChat) {
        console.log('Creating new chat...');
        // Create a new chat
        let chat = {
          id: self.guidGenerator(),
          users: {
            [userName]: true,
            [currentUserName]: true
          },
          timeCreated: new Date()
        }
        chatsCollection
        .add(chat)
        .then(function (response) {
          console.log(response);
          
          self.chatSelected.emit(chat);
        })
      } else {
        // open existing chat
        console.log('Opening existing chat...');
        console.log(foundChat);
                
        self.chatSelected.emit(foundChat);
      }
    })
    .catch(err => {
      console.log(err);
    })
  }


}
