import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { MaterialModule } from '../shared/material.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [MenuComponent, ConfirmDialogComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports: [MenuComponent, ConfirmDialogComponent]
})
export class UiElementsModule { }
