import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {TruncatePipe} from './pipes/truncate.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChildGroupingComponent} from './child-grouping/child-grouping.component';
import {SetToArrayPipe} from './pipes/set-to-array.pipe';
import {CriterionComponent} from './criterion/criterion.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {FrameworkResolver} from '../information/resolvers/framework-resolver.service';
import {FrameworkRendererComponent} from './framework-renderer/framework-renderer.component';
import {BottomNavComponent} from './bottom-nav/bottom-nav.component';
import {YesNoPipe} from './pipes/yes-no.pipe';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    TruncatePipe,
    SetToArrayPipe,
    YesNoPipe,
    ChildGroupingComponent,
    CriterionComponent,
    HeaderComponent,
    FooterComponent,
    FrameworkRendererComponent,
    BottomNavComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PageNotFoundComponent,
    TruncatePipe,
    SetToArrayPipe,
    YesNoPipe,
    ChildGroupingComponent,
    HeaderComponent,
    FooterComponent,
    FrameworkRendererComponent,
    BottomNavComponent
  ],
  providers: [FrameworkResolver]
})
export class SharedModule {
}
