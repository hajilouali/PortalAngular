import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { PayComponent } from './pay/pay.component';
import { PayGlobalyComponent } from './pay-globaly/pay-globaly.component';


@NgModule({
  declarations: [PayComponent, PayGlobalyComponent],
  imports: [
    CommonModule,
    WalletRoutingModule
  ]
})
export class WalletModule { }
