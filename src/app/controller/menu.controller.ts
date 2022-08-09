import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
  export class MenuController {
    public menuItems = [
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
  }