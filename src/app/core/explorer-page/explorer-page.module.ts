import {NgModule} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {ExplorerPageRoutingModule} from './explorer-page-routing.module';
import {ExplorerPageComponent} from './explorer-page.component';
import {ExplorerViewConfComponent} from './explorer-view-conf/explorer-view-conf.component';
import {ExplorerHeaderComponent} from './explorer-header/explorer-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot(),
    ExplorerPageRoutingModule
  ],
  declarations: [
    ExplorerPageComponent,
    ExplorerHeaderComponent,
    ExplorerViewConfComponent
  ]
})
export class ExplorerPageModule {
}
