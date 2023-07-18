import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./shared/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'info', loadChildren: () => import(`src/app/information/information.module`).then(m => m.InformationModule)},
  /*{path: 'platforms', loadChildren: () => import(`src/app/technologies/technologies.module`).then(m => m.TechnologiesModule)},*/
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
