import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoading = false;
  email: string = '';
  password: string = '';

  newEmail: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  user: User = { uid: '', name: '', email: '', secret: '', contact: '' };

  constructor(
    private auth: AuthenticationService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {}

  async signUp(){
    this.isLoading = true;
    await this.auth.SignUp(this.user, this.newPassword)
      .catch((err) => {
        let error = this.formatError(err);
        this.toast.showToast(error, '');
        this.isLoading = false;
        console.log('Something went wrong:', err);
      });
    this.auth.SignUp(this.user, this.newPassword);
  }

  async signIn() {
    this.isLoading = true;
    await this.auth
      .SignIn(this.email, this.password)
      .catch((err) => {
        let error = this.formatError(err);
        this.toast.showToast(error, '');
        this.isLoading = false;
        console.log('Something went wrong:', err);
      });
  }

  formatError(err: string): string{
    let error = err.replace('Firebase:','');
    error = error.substring(0, error.indexOf('(auth'));
    return error
  }
}
