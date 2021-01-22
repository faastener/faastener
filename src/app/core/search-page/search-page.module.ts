import {NgModule} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {SearchPageRoutingModule} from './search-page-routing.module';
import {SearchPageComponent} from './search-page.component';
import {SearchHeaderComponent} from './search-header/search-header.component';
import {FilterComponent} from './filter/filter.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    CommonModule,
    ReactiveFormsModule,
    SearchPageRoutingModule
  ],
  declarations: [
    SearchPageComponent,
    SearchHeaderComponent,
    FilterComponent
  ]
})
export class SearchPageModule {
}
