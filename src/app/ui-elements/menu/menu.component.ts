import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav?: MatSidenav;

  @Input()
  menuItems:any;
  sideNaveMode: MatDrawerMode = 'side';

  constructor(
    private observer: BreakpointObserver,
    private dialog: MatDialog,
    private auth: AuthenticationService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
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
      }}, 2000)
    });
  }

  getMenuParams(params: string): object{
    return (params !== '')?({ type: params }): ({});
  }

  logout() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '450px',
      data: {
        title: 'Logout',
        message: `Are you sure you want to logout from Super Pass ?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.auth.SignOut();
      }
    });
  }
}
