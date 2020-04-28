import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [UpdatePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule
  ]
})
export class UserModule { }
