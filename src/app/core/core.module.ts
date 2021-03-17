import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once.guard';
import {DataService} from './services/data.service';
import {LogoLocatorService} from './services/logo-locator.service';
import {RandomColorService} from './services/random-color.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [DataService, LogoLocatorService, RandomColorService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
