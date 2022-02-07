import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let user = await this._authService.isLoggedIn();

    if (user) {
      return new Promise(function (resolve, reject) {
        resolve(true);
      });
    }

    // navigate to login page
    this._router.navigate(['/login']);
    return new Promise(function (resolve, reject) {
      resolve(false);
    });
    // you can save redirect url so after authing we can move them back to the page they requested
    //return false;
  }
}
