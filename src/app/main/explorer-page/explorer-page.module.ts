import {NgModule} from '@angular/core';
import {MaterialModule} from '../../shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {ExplorerPageRoutingModule} from './explorer-page-routing.module';
import {ExplorerPageComponent} from './explorer-page.component';
import {ExplorerViewConfComponent} from './explorer-view-conf/explorer-view-conf.component';
import {ExplorerHeaderComponent} from './explorer-header/explorer-header.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExplorerViewComponent} from './explorer-view/explorer-view.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExplorerPageRoutingModule
  ],
  declarations: [
    ExplorerPageComponent,
    ExplorerHeaderComponent,
    ExplorerViewConfComponent,
    ExplorerViewComponent
  ]
})
export class ExplorerPageModule {
}
