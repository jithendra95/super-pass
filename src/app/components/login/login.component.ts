import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  email: string = '';
  password: string ='';

  newEmail: string = '';
  newPassword: string ='';
  confirmPassword: string ='';

  user: User = {uid:'', name: '', email: '', secret: '', contact: ''}

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
  }

  signUp(): void{
    this.auth.SignUp(this.user, this.newPassword);
  }

}
