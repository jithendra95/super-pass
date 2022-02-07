import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<any>;
  constructor(private angularFireAuth: AngularFireAuth) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('You are Successfully signed up!', res);
      })
      .catch((error) => {
        console.log('Something is wrong:', error.message);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("You're in!");
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  isLoggedIn() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
   }

   isLoggedIn$(){
     return this.angularFireAuth.authState;
   }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
  }
}
