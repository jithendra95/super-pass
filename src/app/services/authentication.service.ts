import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserState } from '../states/user.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<any>;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private database: AngularFireDatabase,
    private userState: UserState
  ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(user: User, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(user.email, password)
      .then((res) => {
        if(res.user)
          user.uid = res.user.uid;

        this.userState.addWithId(user.uid, user);
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
        if(res.user)
         this.userState.read(res.user.uid);
         console.log("You're in!");
      })
      .catch((err) => {
        console.log('Something went wrong:', err.message);
      });
  }

  isLoggedIn() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  isLoggedIn$() {
    return this.angularFireAuth.authState;
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut();
  }
}
