import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {TruncatePipe} from './truncate.pipe';
import {CriteriaGroupingComponent} from './criteria-grouping/criteria-grouping.component';
import {FormsModule} from '@angular/forms';
import {ChildGroupingComponent} from './child-grouping/child-grouping.component';
import {SetToArrayPipe} from './set-to-array.pipe';
import { CriterionComponent } from './criterion/criterion.component';

@NgModule({
  declarations: [PageNotFoundComponent, TruncatePipe, SetToArrayPipe, CriteriaGroupingComponent, ChildGroupingComponent, CriterionComponent],
  imports: [CommonModule, FormsModule, MaterialModule, RouterModule],
  exports: [CommonModule, FormsModule, MaterialModule, PageNotFoundComponent, TruncatePipe, SetToArrayPipe, CriteriaGroupingComponent, ChildGroupingComponent]
})
export class SharedModule {
}
