import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  isLoggedIn: boolean = false;
  constructor(private auth: AuthenticationService) { 
    auth.isLoggedIn$().subscribe((res) => {
      this.isLoggedIn = res !== null;
    })
  }

  ngOnInit(): void {
  }

}
