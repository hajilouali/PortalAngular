import { NotFondComponent } from './not-fond/not-fond.component';

import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService } from './Services/guard.service';
import { MainComponent } from './sheard/main/main.component';




const routes: Routes = [
  {path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  {path: 'Dashboard', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: DashboardComponent
  }]},
  {path: '**', component: NotFondComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
