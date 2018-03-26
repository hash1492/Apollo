import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { firebaseAuth } from "../firebase/firebase.config";


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
      var self = this;
      console.log('canActivate called');
      firebaseAuth.onAuthStateChanged(function(user) {
        console.log(user);

        if (user) {          
          return true
        } else {
          self.router.navigate(['login']);
          return false
        }
      });
      return true;
  }
}