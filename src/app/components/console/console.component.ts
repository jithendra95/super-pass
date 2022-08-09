import { Component, OnInit } from '@angular/core';
import { MenuController } from 'src/app/controller/menu.controller';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  isLoading = true;
  isLoggedIn: boolean = false;

  constructor(private auth: AuthenticationService, private loader: LoaderService, public menu: MenuController) {
    this.auth.isLoggedIn$().subscribe((res) => {
      this.isLoggedIn = res !== null;
      if (res !== null)
        this.loader.load(res.uid);

      this.isLoading = false;
    })
  }

  ngOnInit(): void {
  }

}
