import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LoginAuthGuard } from './auth-guard';
const routes: Routes = [
  { path: 'login',canActivate: [LoginAuthGuard], loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
  { path: '', canActivate: [AuthGuard], loadChildren: () => import('./components/vault/vault.module').then(m => m.VaultModule)},
  { path: 'vault', canActivate: [AuthGuard], loadChildren: () => import('./components/vault/vault.module').then(m => m.VaultModule)},
  { path: 'password',canActivate: [AuthGuard], loadChildren: () => import('./components/password/password.module').then(m => m.PasswordModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
