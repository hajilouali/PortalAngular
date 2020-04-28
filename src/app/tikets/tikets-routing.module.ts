import { DitailTiketComponent } from './ditail-tiket/ditail-tiket.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../sheard/main/main.component';
import { TiketsManagerComponent } from './tikets-manager/tikets-manager.component';
import { GuardService } from '../Services/guard.service';
import { TicketResolver } from '../core/_base/resolvers/user/ticket-resolver.service';
import { TicketOverviewResolver } from '../core/_base/resolvers/user/ticket-overview-resolver.service';


const routes: Routes = [
  {path: 'Tikets', component: MainComponent, canActivate: [GuardService], children: [
    {path: '', resolve: { tickets: TicketResolver }, component: TiketsManagerComponent,
    children: [
      {
        path: 'overview',
        component: DitailTiketComponent,
        // resolve: { ticket: TicketOverviewResolver },

      }
    ] }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiketsRoutingModule { }
