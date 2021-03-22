import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TechnologiesComponent} from './technologies.component';
import {TechnologiesRoutingModule} from './technologies-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TechnologyListComponent} from './technology-list/technology-list.component';
import {TechnologyDetailsComponent} from './technology-details/technology-details.component';
import {TechnologiesResolver} from './technologies-resolver.service';
import { TechnologyTableComponent } from './technology-table/technology-table.component';

@NgModule({
  declarations: [TechnologiesComponent, TechnologyListComponent, TechnologyDetailsComponent, TechnologyTableComponent],
  imports: [CommonModule, SharedModule, TechnologiesRoutingModule],
  providers: [TechnologiesResolver]
})
export class TechnologiesModule {
}
