import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResourcesComponent} from './resources/resources.component';
import {FaqComponent} from './faq/faq.component';
import {InformationComponent} from './information.component';
import {FrameworkComponent} from './framework/framework.component';
import {classificationFrameworkResolver, resourcesResolver} from "../core/resolvers";

const infoRoutes: Routes = [
  {
    path: '',
    component: InformationComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'framework'},
      {path: 'framework', component: FrameworkComponent, resolve: {resolvedData: classificationFrameworkResolver}},
      {path: 'resources', component: ResourcesComponent, resolve: {resolvedData: resourcesResolver}},
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
