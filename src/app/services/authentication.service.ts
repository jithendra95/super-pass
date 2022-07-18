import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { first, Observable } from 'rxjs';
import { UserController } from '../controller/user.controller';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: Observable<any> | null;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private userCtrl: UserController,
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

          thisInst.userCtrl.createUser(user.uid, user);
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
          thisInst._router.navigate(['/']);
          resolve('');
        })
        .catch((err) => {
          reject(err.message);
        });
    });
  }

  isLoggedIn() {
    return this.angularFireAuth.authState.pipe(first()).toPromise();
  }

  isLoggedIn$() {
    return this.angularFireAuth.authState;
  }

  /* Sign out */
  async SignOut() {
    // this.userState.unload();
    this.userData = null;
    await this.angularFireAuth.signOut();
    this._router.navigate(['/login']);
  }
}
