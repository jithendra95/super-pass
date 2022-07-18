import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import {
  MatDrawer,
  MatDrawerMode,
  MatSidenav,
} from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { delay, Observable, Subscription } from 'rxjs';
import { PasswordController } from 'src/app/controller/password.controller';
import { VaultController } from 'src/app/controller/vault.controller';
import { Password, PasswordType } from 'src/app/models/password.interface';
import { Vault } from 'src/app/models/vault.interface';

@Component({
  selector: 'app-password-view',
  templateUrl: './password-view.component.html',
  styleUrls: ['./password-view.component.scss'],
})
export class PasswordViewComponent implements OnInit {
  //selected?: Password;
  passwordType = PasswordType;

  passwords$?: Observable<Password[]>;
  allValues: Password[] = [];
  searchText = '';
  subs: Subscription[] = [];

  routerSubs?: Subscription;
  selectedSub?: Subscription;

  selected?: Password;
  isLoading = true;

  sideNaveMode: MatDrawerMode = 'side';
  sideNavePosition: 'start' | 'end' = 'end';
  @ViewChild(MatSidenav)
  sidenav?: MatSidenav;

  constructor(
    public dialog: MatDialog,
    public passwordCtrl: PasswordController,
    public vaultCtrl: VaultController,
    private route: ActivatedRoute,
    private router: Router,
    private observer: BreakpointObserver
  ) {
    this.subs.push(
      this.router.events.subscribe((e: any) => {
        // If it is a NavigationEnd event re-initalise the component
        if (e instanceof NavigationEnd) {
          this.initialize();
        }
      })
    );
  }

  initialize(): void {
    this.unsubscribe();

    //this.selected = undefined;
    this.searchText = '';

    this.routerSubs = this.route.queryParams.subscribe((params) => {
      let type = params['type'];
      this.passwords$ = this.passwordCtrl.getPasswords$(type);
      this.isLoading = false;
    });

    this.selectedSub = this.passwordCtrl
      .getPassword$()
      .subscribe((password) => {
        this.selected = password;
      });
  }

  unsubscribe(): void {
    this.routerSubs?.unsubscribe();
    this.selectedSub?.unsubscribe();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 1080px)']).subscribe((res) => {
      setTimeout(() => {
        if (this.sidenav) {
          if (res.matches) {
            this.sideNaveMode = 'over';
            this.sidenav.close();
          } else {
            this.sideNaveMode = 'side';
            this.sidenav.open();
          }
        }
      }, 2000);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });

    this.unsubscribe();
  }

  select(item: Password) {
    this.passwordCtrl.selectPassword(item);
    this.openSideNav();
  }

  openSideNav(): void {
    if (this.sidenav) {
      this.sidenav.open();
    }
  }

  closeSideNav(): void {
    if (this.sidenav) {
      this.sidenav.close();
    }
  }

  add(): void {
    this.passwordCtrl.create();
  }

  edit() {
    // this.pass = this.selected!;
    // this.openDialog();
    this.passwordCtrl.edit();
  }

  delete() {
    this.passwordCtrl.delete();
  }

  search(): void {
    this.passwords$ = this.passwordCtrl.search(this.searchText);
  }

  changeSearch(): void {
    if (this.searchText == '') {
      this.passwords$ = this.passwordCtrl.search(this.searchText);
    }
  }

  favourite(): void {
    this.passwordCtrl.favourite();
  }

  copyToClipBoard(value: string | undefined): void {
    this.passwordCtrl.copyToClipBoard(value);
  }

  copyAccount(): void {
    this.passwordCtrl.copyAccount();
  }
}

@Component({
  selector: 'password-create-dialog',
  templateUrl: 'password-create.dialog.html',
  styleUrls: ['./password-create.dialog.scss'],
})
export class PasswordCreateDialog {
  passwordType = PasswordType;
  passwordTypeKeys = Object.keys(this.passwordType).filter(
    (key) => !isNaN(Number(key))
  );

  showPassword = false;
  showPin = false;
  showCvc = false;

  constructor(
    public dialogRef: MatDialogRef<PasswordCreateDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { password: Password; vaults: Vault[] }
  ) {
    dialogRef.disableClose = true;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    this.dialogRef.close(this.data.password);
  }

  getPasswordDesc(index: string): string {
    return PasswordType[parseInt(index)];
  }
}
