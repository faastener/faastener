import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './home/about/about.component';
import {BannerComponent} from './home/banner/banner.component';
import {OverviewComponent} from './home/overview/overview.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [AppComponent, HomeComponent, AboutComponent, BannerComponent, OverviewComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
