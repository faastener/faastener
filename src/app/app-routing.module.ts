import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {path: 'search', loadChildren: () => import(`src/app/search-page/search-page.module`).then(m => m.SearchPageModule)},
  {path: 'platforms', loadChildren: () => import(`src/app/platforms/platforms.module`).then(m => m.PlatformsModule)},
  /*{
    path: 'explorer/:platformId',
    loadChildren: () => import(`src/app/explorer-page/platform-explorer.module`).then(m => m.PlatformExplorerModule)
  },
  {path: 'explorer', loadChildren: () => import(`src/app/explorer-page/platform-explorer.module`).then(m => m.PlatformExplorerModule)},*/
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
