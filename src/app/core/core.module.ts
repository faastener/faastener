import {APP_INITIALIZER, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once.guard';
import {ConfigurationService} from './services/configuration.service';
import {AbstractDataService} from "./services/abstract-data.service";
import {environment} from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigurationService],
      useFactory: (appConfigService: ConfigurationService) => (() => appConfigService.load())
    },
    {
      provide: AbstractDataService,
      useClass: environment.dataService
    },
    ConfigurationService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
