import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ConfirmDialogComponent, PasswordInputComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [ConfirmDialogComponent, PasswordInputComponent]
})
export class UiElementsModule { }
