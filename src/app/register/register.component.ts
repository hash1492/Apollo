import { Component, OnInit } from '@angular/core';
import { usersCollection, firebaseAuth } from '../firebase/firebase.config'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    
  }

  register() {
    var self = this;
    console.log('register called');
    console.log(this.user);
    console.log(firebaseAuth);
    let { name, email, password, confirmPassword } = this.user;
    if(password !== confirmPassword) {
      self.toastr.error('Password and Confirm Password fields must match', "Passwords don't match");
      return;
    }
    firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      console.log(response);
      usersCollection
      .add({
        name: name,
        firebaseAuthId: response.uid
      })
      .then(function() {
          console.log("Document successfully written!");
          self.toastr.success(email + ' is registered successfully ', 'Registration Successful');
          self.router.navigate(['login']);
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
    })
    .catch(err => {
      console.log(err);
      switch (err.code) {
        case 'auth/email-already-in-use':
          self.toastr.error('A user with this email already exists', 'User already exists');
          break
        case 'auth/invalid-email':
          self.toastr.error('The email address is badly formatted', 'Invalid Email');
          break
        case 'auth/weak-password':
          self.toastr.error('Password should be atleast 6 characters', 'Weak Password');
          break;
        default:
      }
    })
  }
}
