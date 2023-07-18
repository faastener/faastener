import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FrameworkRendererComponent} from "./framework-renderer/framework-renderer.component";
import {ChildGroupingComponent} from "./child-grouping/child-grouping.component";
import {CriterionComponent} from "./criterion/criterion.component";
import {SetToArrayPipe} from "./pipes/set-to-array.pipe";
import {YesNoPipe} from "./pipes/yes-no.pipe";

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    FrameworkRendererComponent,
    ChildGroupingComponent,
    CriterionComponent,
    SetToArrayPipe,
    YesNoPipe,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    FrameworkRendererComponent,
    ChildGroupingComponent,
    CriterionComponent,
    SetToArrayPipe,
    YesNoPipe,
    PageNotFoundComponent,
    FontAwesomeModule
  ],
  //providers: [FrameworkResolver]
})
export class SharedModule {
}
