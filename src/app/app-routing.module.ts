import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  { path: 'vault', loadChildren: () => import('./vault/vault.module').then(m => m.VaultModule)},
  { path: 'password', loadChildren: () => import('./password/password.module').then(m => m.PasswordModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
