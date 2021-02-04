import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FooterComponent} from './footer/footer.component';
import {EnsureModuleLoadedOnceGuard} from './ensure-module-loaded-once.guard';


@NgModule({
  declarations: [FooterComponent],
  exports: [FooterComponent],
  imports: [CommonModule]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
