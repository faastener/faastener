import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocsComponent} from './docs/docs.component';
import {ResourcesComponent} from './resources/resources.component';
import {FaqComponent} from './faq/faq.component';
import {InformationComponent} from './information.component';
import {InformationRoutingModule} from './information-routing.module';
import {SharedModule} from '../shared/shared.module';
import {ResourcesResolver} from './resolvers/resources-resolver.service';
import { FrameworkComponent } from './framework/framework.component';

@NgModule({
  declarations: [DocsComponent, ResourcesComponent, FaqComponent, InformationComponent, FrameworkComponent],
  imports: [CommonModule, SharedModule, InformationRoutingModule],
  providers: [ResourcesResolver]
})
export class InformationModule {
}
