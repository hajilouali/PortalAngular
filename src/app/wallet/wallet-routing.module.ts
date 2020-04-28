import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../sheard/main/main.component';
import { GuardService } from '../Services/guard.service';
import { PayComponent } from './pay/pay.component';


const routes: Routes = [
  {path: 'pay', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: PayComponent
  }]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }
