import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once.guard';
import {DataService} from './services/data.service';
import {LogoLocatorService} from './services/logo-locator.service';
import {RandomColorService} from './services/random-color.service';
import {AppConfigService} from './services/app-config.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    AppConfigService,
    DataService,
    LogoLocatorService,
    RandomColorService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
