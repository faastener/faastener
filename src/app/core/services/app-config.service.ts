import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogoLocatorService} from './logo-locator.service';
import {LocalTestDataService} from './local-test-data.service';

@Injectable()
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient, private logoLocator: LogoLocatorService) {
  }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get defaultTechCategory() {
    return this.appConfig?.defaultTechCategory;
  }

  get repositoryMode() {
    return this.appConfig?.repositoryMode;
  }

  public dataServiceFactory() {
    if (this.repositoryMode === 'file' || !this.repositoryMode) {
      return new LocalTestDataService(this.http, this.logoLocator);
    } else {
      // other repository implementations
      return undefined;
    }
  }
}
