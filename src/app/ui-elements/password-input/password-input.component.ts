import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {

  @Input()
  password: string | undefined = '';

  @Output()
  passwordChange = new EventEmitter<string>();

  @Input()
  label: string = '';
  
  @Input()
  fullWidth = false;

  
  showPassword = false;
  
  constructor() { }

  ngOnInit(): void {
  }

  showHidePassword(): void{
    this.showPassword = !this.showPassword;
  }

  onPasswordChange(): void{
    this.passwordChange.emit(this.password);
  }

}
