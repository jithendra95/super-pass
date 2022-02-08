import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VaultCreateDialog, VaultViewComponent } from './vault-view/vault-view.component';
import { VaultRoutingModule } from './vault-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [VaultViewComponent, VaultCreateDialog],
  imports: [CommonModule, SharedModule, VaultRoutingModule],
  exports: [VaultViewComponent],
})
export class VaultModule {}
