import { Component, OnInit } from '@angular/core';
import { log } from 'util';
import { Router } from '@angular/router';
import { firebaseAuth, usersCollection } from '../firebase/firebase.config'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  login() {
    var self = this;
    console.log('login called');
    console.log(this.user);
    let { email, password } = this.user;
    firebaseAuth.signInWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response);
      usersCollection
      .where('firebaseAuthId', '==', response.uid)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        querySnapshot.forEach(doc => {
          localStorage.setItem('currentUser', JSON.stringify(doc.data()));
          self.toastr.success('Hello ' + email, 'Welcome');
          this.router.navigate(['chat-dashboard']); 
        })
      })
    })
    .catch(err => {
      console.log(err);
      switch (err.code) {
        case 'auth/invalid-email':
          self.toastr.error('The email address is badly formatted', 'Invalid email');
          self.user.password = ''
          break
        case 'auth/user-not-found':
          self.toastr.error('The user with this email was not found', 'User not found');
          self.user.password = ''
          break
        case 'auth/wrong-password':
          self.toastr.error('The password entered for this user is incorrect', 'Incorrect Password');          
          self.user.password = ''
          break
        default:
      }
    })
  }
}
