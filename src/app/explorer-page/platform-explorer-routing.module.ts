import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformExplorerComponent} from './platform-explorer.component';

const explorerPageRoutes: Routes = [
  {path: ':platformId', component: PlatformExplorerComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(explorerPageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlatformExplorerRoutingModule {
}
