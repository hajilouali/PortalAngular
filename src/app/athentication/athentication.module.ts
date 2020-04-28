import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AthenticationRoutingModule } from './athentication-routing.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    LoginComponent,
    
  ],
  imports: [
    CommonModule,
    AthenticationRoutingModule,
    CoreModule
    
  ]
})
export class AthenticationModule { }
