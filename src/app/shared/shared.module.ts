import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [CommonModule, MaterialModule, PageNotFoundComponent]
})
export class SharedModule {
}
