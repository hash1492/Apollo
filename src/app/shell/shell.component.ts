import { Component, OnInit } from '@angular/core';
import { firebaseAuth, usersCollection } from '../firebase/firebase.config'
import { Router } from '@angular/router';



@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit {
  currentUser
  isLoggedIn
  constructor(private router: Router) { }

  ngOnInit() { 
    var self = this;
    firebaseAuth.onAuthStateChanged(function(user) {
      console.log(user);
      
      if (user) {
        
        self.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        self.isLoggedIn = true;
      } else {
        self.currentUser = null;
        self.isLoggedIn = false;
      }
    });
   }

  logout() {
    console.log('logout called');
    var self = this;
    firebaseAuth.signOut()
    .then(function() {
      console.log('Logged out successfully!');
      localStorage.removeItem('currentUser')
      self.router.navigate(['login']);
    })
  }

}
