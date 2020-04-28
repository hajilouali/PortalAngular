import { AppModule } from './../app.module';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheardRoutingModule } from './sheard-routing.module';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { RightsidebarComponent } from './rightsidebar/rightsidebar.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { MainComponent } from './main/main.component';
import { NgxUiLoaderModule, NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';
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
    TopmenuComponent,
    RightsidebarComponent,
    LeftsidebarComponent,
    MainComponent,

  ],
  imports: [
    CommonModule,
    SheardRoutingModule,
    NgxUiLoaderModule.forRoot(NgxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({showForeground: true})
  ],
  exports:[
    TopmenuComponent,
    RightsidebarComponent,
    LeftsidebarComponent,
    MainComponent,
  ]
})
export class SheardModule { }
