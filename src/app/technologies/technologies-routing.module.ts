import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologiesComponent} from './technologies.component';
import {TechnologyDetailsComponent} from './technology-details/technology-details.component';
import {technologyDetailsResolver, technologyResolver} from "../core/resolvers";

const platformRoutes: Routes = [
  {path: '', component: TechnologiesComponent, resolve: {resolvedData: technologyResolver}},
  {path: ':platformId', component: TechnologyDetailsComponent, resolve: {resolvedData: technologyDetailsResolver}}
];

@NgModule({
  imports: [
    RouterModule.forChild(platformRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TechnologiesRoutingModule {
}
