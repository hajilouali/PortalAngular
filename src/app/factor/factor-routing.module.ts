import { FactorInfoComponent } from './factor-info/factor-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';
import { FactorAttachmentComponent } from './factor-attachment/factor-attachment.component';
import { AddAttachmentComponent } from './add-attachment/add-attachment.component';
import { AddFactorComponent } from './add-factor/add-factor.component';
import { GuardService } from '../Services/guard.service';
import { MainComponent } from '../sheard/main/main.component';

const routes: Routes = [
  {path: 'Invoicelist', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: TestComponent
  }]},
  {path: 'FactorAttachment', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: FactorAttachmentComponent
  }]},
  {path: 'AddAttachment', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: AddAttachmentComponent
  }]},
  {path: 'NewFactor', component: MainComponent, canActivate: [GuardService], children: [{
    path: '', component: AddFactorComponent
  }]},
  {path: 'FactorInfo', component: FactorInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorRoutingModule { }
