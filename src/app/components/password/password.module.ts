import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordCreateDialog, PasswordViewComponent } from './password-view/password-view.component';
import { PasswordRoutingModule } from './password-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    PasswordViewComponent, PasswordCreateDialog
  ],
  imports: [
    CommonModule,
    SharedModule,
    PasswordRoutingModule
  ],
  exports:[PasswordViewComponent]
})
export class PasswordModule { }
