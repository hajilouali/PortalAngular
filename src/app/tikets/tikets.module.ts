import { TiketServicesService } from './Services/tiket-services.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiketsRoutingModule } from './tikets-routing.module';
import { TiketsManagerComponent } from './tikets-manager/tikets-manager.component';
import { CoreModule } from '../core/core.module';
import { ListTiketsComponent } from './list-tikets/list-tikets.component';
import { TiketComponent } from './tiket/tiket.component';
import { DitailTiketComponent } from './ditail-tiket/ditail-tiket.component';
import { ChatTiketComponent } from './chat-tiket/chat-tiket.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CreateFormTicketComponent } from './create-form-ticket/create-form-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketResolver } from '../core/_base/resolvers/user/ticket-resolver.service';
import { TicketOverviewResolver } from '../core/_base/resolvers/user/ticket-overview-resolver.service';
import { ChatMessageTicketComponent } from './chat-message-ticket/chat-message-ticket.component';


@NgModule({
  declarations: [
    TiketsManagerComponent,
    ListTiketsComponent,
    TiketComponent,
    DitailTiketComponent,
    ChatTiketComponent,
    CreateFormTicketComponent,
    ChatMessageTicketComponent],
  imports: [
    CommonModule,
    TiketsRoutingModule,
    CoreModule,
    InfiniteScrollModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    TiketServicesService,
    TicketResolver,
    TicketOverviewResolver
  ]
})
export class TiketsModule { }
