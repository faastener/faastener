import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {InfoPageModule} from './core/info-page/info-page.module';
import {FooterComponent} from './core/footer/footer.component';
import {ExplorerPageModule} from './core/explorer-page/explorer-page.module';
import {SearchPageModule} from './core/search-page/search-page.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    InfoPageModule,
    SearchPageModule,
    ExplorerPageModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    FooterComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
