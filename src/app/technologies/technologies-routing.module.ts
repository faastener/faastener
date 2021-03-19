import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologiesComponent} from './technologies.component';
import {TechnologyDetailsComponent} from './technology-details/technology-details.component';
import {TechnologiesResolver} from './technologies-resolver.service';

const platformRoutes: Routes = [
  {path: '', redirectTo: 'faas', pathMatch: 'full'}, // default technology type
  {path: ':category', component: TechnologiesComponent, resolve: {resolvedData: TechnologiesResolver}},
  {path: ':category/:platformId', component: TechnologyDetailsComponent}
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
