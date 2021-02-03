import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', loadChildren: () => import(`src/app/info-page/info-page.module`).then(m => m.InfoPageModule)},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'search', loadChildren: () => import(`src/app/search-page/search-page.module`).then(m => m.SearchPageModule)},
  {path: 'explorer', loadChildren: () => import(`src/app/explorer-page/explorer-page.module`).then(m => m.ExplorerPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
