import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordViewComponent } from './password/password-view/password-view.component';
import { VaultViewComponent } from './vault/vault-view/vault-view.component';

const routes: Routes = [
  { path: 'vault', loadChildren: () => import('./vault/vault.module').then(m => m.VaultModule)},
  { path: 'password', loadChildren: () => import('./password/password.module').then(m => m.PasswordModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
