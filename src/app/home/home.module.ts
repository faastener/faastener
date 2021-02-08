import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {MaterialModule} from '../shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BannerComponent} from './banner/banner.component';
import {AboutComponent} from './about/about.component';
import {PlatformsComponent} from './platforms/platforms.component';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent,
    BannerComponent,
    AboutComponent,
    PlatformsComponent
  ]
})
export class HomeModule {
}
