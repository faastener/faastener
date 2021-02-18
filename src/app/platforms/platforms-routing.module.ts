import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformsComponent} from './platforms.component';
import {PlatformDetailsComponent} from './platform-details/platform-details.component';

const platformRoutes: Routes = [
  {path: '', component: PlatformsComponent},
  {path: ':platformId', component: PlatformDetailsComponent}
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
