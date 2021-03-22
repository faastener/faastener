import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {MaterialModule} from '../shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BannerComponent} from './banner/banner.component';
import {AboutComponent} from './about/about.component';
import {OverviewComponent} from './overview/overview.component';
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [
        MaterialModule,
        FlexLayoutModule,
        CommonModule,
        HomeRoutingModule,
        SharedModule
    ],
  declarations: [
    HomeComponent,
    BannerComponent,
    AboutComponent,
    OverviewComponent
  ]
})
export class HomeModule {
}
