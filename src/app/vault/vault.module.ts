import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultCreateDialog, VaultViewComponent } from './vault-view/vault-view.component';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VaultRoutingModule } from './vault-routing.module';

@NgModule({
  declarations: [VaultViewComponent, VaultCreateDialog],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, VaultRoutingModule],
  exports: [VaultViewComponent],
})
export class VaultModule {}
