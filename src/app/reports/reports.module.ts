import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { MoeinClientComponent } from './moein-client/moein-client.component';
import { FactorreportComponent } from './factorreport/factorreport.component';
import { CoreModule } from '../core/core.module';
import { FactorReportByCodeComponent } from './factor-report-by-code/factor-report-by-code.component';


@NgModule({
  declarations: [
    MoeinClientComponent,
    FactorreportComponent,
    FactorReportByCodeComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    CoreModule
  ]
})
export class ReportsModule { }
