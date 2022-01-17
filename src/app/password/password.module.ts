import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordViewComponent } from './password-view/password-view.component';
import { MaterialModule } from '../shared/material.module';
import { PasswordRoutingModule } from './password-routing.module';



@NgModule({
  declarations: [
    PasswordViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PasswordRoutingModule
  ],
  exports:[PasswordViewComponent]
})
export class PasswordModule { }
