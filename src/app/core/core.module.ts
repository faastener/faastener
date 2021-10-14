import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once.guard';
import {LogoLocatorService} from './services/logo-locator.service';
import {RandomColorService} from './services/random-color.service';
import {AppConfigService} from './services/app-config.service';
import {DataService} from './services/data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => (() => appConfigService.loadAppConfig())
    },
    {
      provide: DataService,
      useFactory: (appConfigService: AppConfigService) => (appConfigService.dataServiceFactory()),
      deps: [AppConfigService]
    },
    AppConfigService,
    LogoLocatorService,
    RandomColorService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
