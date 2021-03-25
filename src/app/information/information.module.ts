import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FrameworkComponent} from './framework/framework.component';
import {DocsComponent} from './docs/docs.component';
import {ResourcesComponent} from './resources/resources.component';
import {FaqComponent} from './faq/faq.component';
import {InformationComponent} from './information.component';
import {InformationRoutingModule} from './information-routing.module';
import {SharedModule} from '../shared/shared.module';
import {FrameworkResolver} from './framework-resolver.service';
import {ResourcesResolver} from './resources-resolver.service';


@NgModule({
  declarations: [FrameworkComponent, DocsComponent, ResourcesComponent, FaqComponent, InformationComponent],
  imports: [CommonModule, SharedModule, InformationRoutingModule],
  providers: [FrameworkResolver, ResourcesResolver]
})
export class InformationModule {
}
