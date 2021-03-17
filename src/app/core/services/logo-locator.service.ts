import {Injectable} from '@angular/core';

@Injectable()
export class LogoLocatorService {
  static readonly platformLogoDir = '/assets/images/vendor/logo/';

  constructor() {
  }

  getLogoPath(logoLocator: string) {
    return LogoLocatorService.platformLogoDir
      .concat(logoLocator)
      .concat(Extension.png);
  }
}

enum Extension {
  png = '.png',
  jpg = '.jpg',
  jpeg = '.jpeg',
  svg = '.svg'
}
