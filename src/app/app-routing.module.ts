import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', loadChildren: () => import(`./main/info-page/info-page.module`).then(m => m.InfoPageModule)},
  {path: 'home', redirectTo: '', pathMatch: 'full'},
  {path: 'search', loadChildren: () => import(`src/app/main/search-page/search-page.module`).then(m => m.SearchPageModule)},
  {path: 'explorer', loadChildren: () => import(`./main/explorer-page/explorer-page.module`).then(m => m.ExplorerPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
