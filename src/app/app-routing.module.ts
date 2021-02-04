import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'home', loadChildren: () => import(`src/app/home/home.module`).then(m => m.HomeModule)},
  {path: 'search', loadChildren: () => import(`src/app/search-page/search-page.module`).then(m => m.SearchPageModule)},
  {path: 'explorer', loadChildren: () => import(`src/app/explorer-page/explorer-page.module`).then(m => m.ExplorerPageModule)},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
