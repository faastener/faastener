import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TechnologiesComponent} from './technologies.component';
import {TechnologiesRoutingModule} from './technologies-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TechnologyListComponent} from './technology-list/technology-list.component';
import {TechnologyDetailsComponent} from './technology-details/technology-details.component';
import {TechnologyTableComponent} from './technology-table/technology-table.component';
import {CriterionFilterComponent} from './criterion-filter/criterion-filter.component';

@NgModule({
  declarations: [TechnologiesComponent, TechnologyListComponent, TechnologyDetailsComponent, TechnologyTableComponent, CriterionFilterComponent],
  imports: [CommonModule, SharedModule, TechnologiesRoutingModule],
  providers: []

})
export class TechnologiesModule {
}
