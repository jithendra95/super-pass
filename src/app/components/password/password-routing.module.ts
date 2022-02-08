import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordViewComponent } from './password-view/password-view.component';




const routes: Routes = [
  {
    path: '',
    component: PasswordViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }