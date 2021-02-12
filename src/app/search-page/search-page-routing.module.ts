import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPageComponent} from './search-page.component';
import {PlatformExplorerComponent} from '../explorer-page/platform-explorer.component';

const searchRoutes: Routes = [
  {path: 'search', component: SearchPageComponent},
  {path: 'explorer', component: PlatformExplorerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(searchRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class SearchPageRoutingModule {
}
