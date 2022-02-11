import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { UserState } from '../states/user.state';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<any> | null;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private userState: UserState,
    private _router: Router
  ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(user: User, password: string) {
    const thisInst = this;
    return new Promise(function (resolve, reject) {
      thisInst.angularFireAuth
        .createUserWithEmailAndPassword(user.email, password)
        .then((res) => {
          if (res.user) user.uid = res.user.uid;

          user.secret = new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
          thisInst.userState.addWithId(user.uid, user);
          thisInst._router.navigate(['/']);
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  /* Sign in */
  SignIn(email: string, password: string): Promise<string> {
    const thisInst = this;
    return new Promise(function (resolve, reject) {
      thisInst.angularFireAuth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          if (res.user) thisInst.userState.read(res.user.uid);

          thisInst._router.navigate(['/']);
          resolve('');
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  isLoggedIn() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user != null && this.userState.object == null) {
        this.userState.read(user.uid);
      }
    });
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  isLoggedIn$() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user != null && this.userState.object == null) {
        this.userState.read(user.uid);
      }
    });

    return this.angularFireAuth.authState;
  }

  /* Sign out */
  async SignOut() {
    this.userState.unload();
    this.userData = null;
    await this.angularFireAuth.signOut();
    this._router.navigate(['/login']);
  }
}
