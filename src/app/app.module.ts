

import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';

import { APP_CONFIG, AppConfig } from "./app.config";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';




import { ReportsModule } from './reports/reports.module';

import { ApiServiceService } from './Services/api-service.service';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { GuardService } from './Services/guard.service';
import { FactorModule } from './factor/factor.module';
import { AthenticationModule } from './athentication/athentication.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SheardModule } from './sheard/sheard.module';
import { TiketsModule } from './tikets/tikets.module';

import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { StoreModule } from '@ngrx/store';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { NotFondComponent } from './not-fond/not-fond.component';
const NgxUiLoaderConfig: NgxUiLoaderConfig = {
  pbColor: 'red',
  bgsColor: 'red',
  bgsPosition: POSITION.bottomRight,
  bgsSize: 70,
  fgsSize: 70,
  fgsPosition: POSITION.bottomRight,
  fgsColor: 'red',
  bgsType: SPINNER.doubleBounce,
  fgsType: SPINNER.doubleBounce,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 3
}

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFondComponent,
  ],
  imports: [
    AthenticationModule,
    TiketsModule,
    FactorModule,
    ReactiveFormsModule,
    ReportsModule,
    UserModule,
    WalletModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    SheardModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({showForeground: true}),
    StoreModule.forRoot({}, {}),


  ],
  exports: [

  ],
  providers: [ApiServiceService, AuthInterceptorService, GuardService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },{
    provide: APP_CONFIG,
    useValue: AppConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
