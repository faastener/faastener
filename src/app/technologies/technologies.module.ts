import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TechnologiesComponent} from './technologies.component';
import {TechnologiesRoutingModule} from './technologies-routing.module';
import {SharedModule} from '../shared/shared.module';
import {TechnologyListComponent} from './technology-list/technology-list.component';
import {TechnologyDetailsComponent} from './technology-details/technology-details.component';
import {TechnologiesResolver} from './technologies-resolver.service';

@NgModule({
  declarations: [TechnologiesComponent, TechnologyListComponent, TechnologyDetailsComponent],
  imports: [CommonModule, SharedModule, TechnologiesRoutingModule],
  providers: [TechnologiesResolver]
})
export class TechnologiesModule {
}
