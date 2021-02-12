import {NgModule} from '@angular/core';
import {MaterialModule} from '../shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {PlatformExplorerRoutingModule} from './platform-explorer-routing.module';
import {PlatformExplorerComponent} from './platform-explorer.component';
import {ExplorerViewConfComponent} from './explorer-view-conf/explorer-view-conf.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ExplorerViewComponent} from './explorer-view/explorer-view.component';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PlatformExplorerRoutingModule
  ],
  declarations: [
    PlatformExplorerComponent,
    ExplorerViewConfComponent,
    ExplorerViewComponent
  ]
})
export class PlatformExplorerModule {
}
