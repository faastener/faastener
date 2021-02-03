import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule]
})
export class SharedModule {
}
