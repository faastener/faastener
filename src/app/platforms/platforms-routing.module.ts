import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformsComponent} from './platforms.component';

const platformRoutes: Routes = [
  {path: '', component: PlatformsComponent},
  {path: ':platformId', component: PlatformsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(platformRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlatformsRoutingModule {
}
