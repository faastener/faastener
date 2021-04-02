import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TechnologiesComponent} from './technologies.component';
import {TechnologyDetailsComponent} from './technology-details/technology-details.component';
import {TechnologiesResolver} from './technologies-resolver.service';
import {TechnologyDetailsResolverService} from './technology-details-resolver.service';

const platformRoutes: Routes = [
  {path: '', redirectTo: 'faas', pathMatch: 'full'}, // default technology type
  {path: ':category', component: TechnologiesComponent, resolve: {resolvedData: TechnologiesResolver}},
  {path: ':category/:platformId', component: TechnologyDetailsComponent, resolve: {resolvedData: TechnologyDetailsResolverService}}
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
