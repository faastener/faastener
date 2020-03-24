import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlatformSelectionComponent} from './core/platform-selection/platform-selection.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'home', loadChildren: () => import(`./core/info-page/info-page.module`).then(m => m.InfoPageModule)},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'search', component: PlatformSelectionComponent},
  {path: 'explorer', loadChildren: () => import(`./core/explorer-page/explorer-page.module`).then(m => m.ExplorerPageModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
