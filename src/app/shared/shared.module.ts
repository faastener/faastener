import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {TruncatePipe} from './truncate.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChildGroupingComponent} from './child-grouping/child-grouping.component';
import {SetToArrayPipe} from './set-to-array.pipe';
import { CriterionComponent } from './criterion/criterion.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [PageNotFoundComponent, TruncatePipe, SetToArrayPipe, ChildGroupingComponent, CriterionComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, PageNotFoundComponent, TruncatePipe, SetToArrayPipe, ChildGroupingComponent, HeaderComponent, FooterComponent]
})
export class SharedModule {
}
