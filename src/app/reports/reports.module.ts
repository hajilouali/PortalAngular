import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { MoeinClientComponent } from './moein-client/moein-client.component';
import { FactorreportComponent } from './factorreport/factorreport.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    MoeinClientComponent,
    FactorreportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CoreModule
  ]
})
export class ReportsModule { }
