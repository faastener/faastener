import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformsComponent } from './platforms.component';
import {PlatformsRoutingModule} from './platforms-routing.module';
import {SharedModule} from '../shared/shared.module';
import { ViewConfigurationComponent } from './view-configuration/view-configuration.component';
import { PlatformsListComponent } from './platforms-list/platforms-list.component';

@NgModule({
  declarations: [PlatformsComponent, ViewConfigurationComponent, PlatformsListComponent],
  imports: [
    CommonModule,
    SharedModule,
    PlatformsRoutingModule
  ]
})
export class PlatformsModule { }
