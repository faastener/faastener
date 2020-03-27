import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: '', loadChildren: () => import(`./core/info-page/info-page.module`).then(m => m.InfoPageModule)},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'search', loadChildren: () => import(`src/app/core/search-page/search-page.module`).then(m => m.SearchPageModule)},
  {path: 'explorer', loadChildren: () => import(`./core/explorer-page/explorer-page.module`).then(m => m.ExplorerPageModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
