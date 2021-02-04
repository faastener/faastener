import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home.component';

const infoPageRoutes: Routes = [
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(infoPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
