import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrameworkComponent} from './framework/framework.component';
import {DocsComponent} from './docs/docs.component';
import {ResourcesComponent} from './resources/resources.component';
import {FaqComponent} from './faq/faq.component';
import {InformationComponent} from './information.component';
import {FrameworkResolver} from './framework-resolver.service';
import {ChildGroupingComponent} from '../shared/child-grouping/child-grouping.component';
import {ResourcesResolver} from './resources-resolver.service';

const infoRoutes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'framework'},
      {
        path: 'framework',
        component: FrameworkComponent,
        resolve: {resolvedData: FrameworkResolver}
      },
      {path: 'framework/:groupingId', component: ChildGroupingComponent},
      {path: 'docs', component: DocsComponent},
      {path: 'resources', component: ResourcesComponent, resolve: {resolvedData: ResourcesResolver}},
      {path: 'faq', component: FaqComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(infoRoutes)],
  exports: [RouterModule]
})
export class InformationRoutingModule {
}
