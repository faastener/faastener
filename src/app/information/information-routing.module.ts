import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourcesComponent} from './resources/resources.component';
import {FaqComponent} from './faq/faq.component';
import {InformationComponent} from './information.component';
import {FrameworkResolver} from './resolvers/framework-resolver.service';
import {ResourcesResolver} from './resolvers/resources-resolver.service';
import {FrameworkComponent} from './framework/framework.component';

const infoRoutes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'framework'},
      {path: 'framework', component: FrameworkComponent, resolve: {resolvedData: FrameworkResolver}},
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
