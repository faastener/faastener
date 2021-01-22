import {NgModule} from '@angular/core';
import {InfoPageRoutingModule} from './info-page-routing.module';
import {InfoPageComponent} from './info-page.component';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BannerComponent} from './banner/banner.component';
import {AboutComponent} from './about/about.component';
import {CommonModule} from '@angular/common';
import {PlatformsListComponent} from './platforms-list/platforms-list.component';
import {InfoPageHeaderComponent} from './info-page-header/info-page-header.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    InfoPageRoutingModule
  ],
  declarations: [
    InfoPageComponent,
    InfoPageHeaderComponent,
    BannerComponent,
    AboutComponent,
    PlatformsListComponent
  ]
})
export class InfoPageModule {
}
