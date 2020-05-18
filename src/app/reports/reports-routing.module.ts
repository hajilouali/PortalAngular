import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../Services/guard.service';
import { MoeinClientComponent } from './moein-client/moein-client.component';
import { FactorreportComponent } from './factorreport/factorreport.component';
import { MainComponent } from '../sheard/main/main.component';
import { FactorReportByCodeComponent } from './factor-report-by-code/factor-report-by-code.component';



const routes: Routes = [
  {path:'Moein',component:MainComponent,canActivate:[GuardService],children:[{
    path:'',component:MoeinClientComponent
  }]},
  {path: 'FactorView', component: MainComponent, canActivate: [GuardService],children:[{
    path: '', component: FactorreportComponent
  }]},
  {path: 'FactorReports' , component: FactorReportByCodeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
