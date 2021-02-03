import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPageComponent} from './search-page.component';
import {ExplorerPageComponent} from '../explorer-page/explorer-page.component';

const searchRoutes: Routes = [
  {path: 'search', component: SearchPageComponent},
  {path: 'explorer', component: ExplorerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(searchRoutes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class SearchPageRoutingModule {
}
