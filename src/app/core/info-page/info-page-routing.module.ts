import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InfoPageComponent} from './info-page.component';

const infoPageRoutes: Routes = [
  {path: 'home', component: InfoPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(infoPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InfoPageRoutingModule {
}
