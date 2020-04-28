import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login',  component: AppComponent,  children: [
    { path: '', component: LoginComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AthenticationRoutingModule { }
