import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberToPersianPipe } from '../Services/number-to-persian-pipe.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
import {MatDialogModule} from '@angular/material/dialog';
import {TableModule} from 'primeng/table';
import {ContextMenuModule} from 'primeng/contextmenu';
import {TooltipModule} from 'primeng/tooltip';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ToastModule} from 'primeng/toast';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from '../Services/api-service.service';
import { AuthInterceptorService } from '../Services/auth-interceptor.service';
import { GuardService } from '../Services/guard.service';
import { APP_CONFIG, AppConfig } from '../app.config';
import { SheardModule } from '../sheard/sheard.module';
import { JalaliPipe } from '../Services/jalali-pipe.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import {MatSelectModule} from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { PersianPipeModule } from 'src/app/sheard/modules/common/persianPipe.module';
import { NumberFormatPipe } from './_base/pipe/number-format-pipe.service';
import { NgBytesPipeModule } from 'angular-pipes';
import { NgAbsPipeModule } from 'angular-pipes';


@NgModule({
  declarations: [
    NumberToPersianPipe,
    JalaliPipe,
    NumberFormatPipe

  ],
  imports: [
    SheardModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    TableModule,
    ContextMenuModule,
    TooltipModule,
    ToastModule,
    TabViewModule,
    CodeHighlighterModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    DpDatePickerModule,
    BrowserModule,
    GalleryModule,
    LightboxModule,
    MatSelectModule,
    PersianPipeModule,
    NgBytesPipeModule,
    NgAbsPipeModule,
    NgScrollbarModule,
    ToastrModule.forRoot(),
    StoreModule.forRoot({}, {})
  ],
  exports: [
    NumberToPersianPipe,
    SheardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    TableModule,
    ContextMenuModule,
    TooltipModule,
    ToastModule,
    TabViewModule,
    CodeHighlighterModule,
    FormsModule , ReactiveFormsModule,
    MatButtonModule,
    DpDatePickerModule,
    BrowserModule,
    GalleryModule,
    LightboxModule,
    NgScrollbarModule,
    MatSelectModule,
    ToastrModule,
    StoreModule,
    PersianPipeModule,
    NumberFormatPipe,
    NgBytesPipeModule,
    NgAbsPipeModule
  ],
  providers: [
    ApiServiceService, AuthInterceptorService, MessageService, GuardService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }, {
      provide: APP_CONFIG,
      useValue: AppConfig
    }]
})
export class CoreModule { }
