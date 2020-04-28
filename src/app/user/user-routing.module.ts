import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../sheard/main/main.component';
import { GuardService } from '../Services/guard.service';
import { UpdatePasswordComponent } from './update-password/update-password.component';


const routes: Routes = [
  {path: 'Password', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: UpdatePasswordComponent
  }]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
