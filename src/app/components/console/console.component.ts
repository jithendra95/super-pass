import { Component, OnInit } from '@angular/core';
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
  menuItems = [
    { icon: 'home', label: 'Vaults', link: '/vault', param: '' },
    { icon: 'person', label: 'All Items', link: '/password', param: 'all' },
    {
      icon: 'star',
      label: 'Favourites',
      link: '/password',
      param: 'favourite',
    },
    {
      label: 'Categories',
      link: '/password',
      param: 'all',
      sublist: [
        {
          icon: 'person',
          label: 'Accounts',
          link: '/password',
          param: 'account',
        },
        {
          icon: 'credit_card',
          label: 'Credit Cards',
          link: '/password',
          param: 'credit',
        },
        {
          icon: 'account_balance',
          label: 'Bank Accounts',
          link: '/password',
          param: 'bank',
        },
      ],
    },
    { icon: 'help', label: 'Help', link: '/password', param: 'all' },
  ];
  constructor(private auth: AuthenticationService, private loader: LoaderService) { 
    this.auth.isLoggedIn$().subscribe((res) => {
      this.isLoggedIn = res !== null;
      if(res !== null)
        this.loader.load(res.uid);
        
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
  }

}
