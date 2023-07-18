import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResourcesComponent} from './resources/resources.component';
import {FaqComponent} from './faq/faq.component';
import {InformationComponent} from './information.component';
import {InformationRoutingModule} from './information-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FrameworkComponent} from './framework/framework.component';

@NgModule({
  declarations: [ResourcesComponent, FaqComponent, InformationComponent, FrameworkComponent],
  imports: [CommonModule, SharedModule, InformationRoutingModule]
})
export class InformationModule {
}
