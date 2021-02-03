import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExplorerPageComponent} from './explorer-page.component';

const explorerPageRoutes: Routes = [
  {path: 'explorer', component: ExplorerPageComponent},
  {path: 'explorer/:platformId', component: ExplorerPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(explorerPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExplorerPageRoutingModule {
}
