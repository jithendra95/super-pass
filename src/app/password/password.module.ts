import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordCreateDialog, PasswordViewComponent } from './password-view/password-view.component';
import { MaterialModule } from '../shared/material.module';
import { PasswordRoutingModule } from './password-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PasswordViewComponent, PasswordCreateDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    PasswordRoutingModule
  ],
  exports:[PasswordViewComponent]
})
export class PasswordModule { }
