import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordCreateDialog, PasswordViewComponent } from './password-view/password-view.component';
import { MaterialModule } from '../shared/material.module';
import { PasswordRoutingModule } from './password-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PasswordViewComponent, PasswordCreateDialog
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    PasswordRoutingModule
  ],
  exports:[PasswordViewComponent]
})
export class PasswordModule { }
