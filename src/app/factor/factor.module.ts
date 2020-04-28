import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorRoutingModule } from './factor-routing.module';
import { FactorAttachmentComponent } from './factor-attachment/factor-attachment.component';
import { AddAttachmentComponent } from './add-attachment/add-attachment.component';
import { AddFactorComponent } from './add-factor/add-factor.component';
import { ProdoctListModalComponent } from './prodoct-list-modal/prodoct-list-modal.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { TestComponent } from './test/test.component';

import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    InvoiceListComponent,
    TestComponent,
    FactorAttachmentComponent,
    AddAttachmentComponent,
    AddFactorComponent,
    ProdoctListModalComponent,
    
  ],
  imports: [
    CommonModule,
    FactorRoutingModule,
    CoreModule,

  ]
})
export class FactorModule { }
