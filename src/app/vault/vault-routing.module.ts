import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaultViewComponent } from './vault-view/vault-view.component';




const routes: Routes = [
  {
    path: '',
    component: VaultViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VaultRoutingModule { }