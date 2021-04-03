import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AppConfigService {
  private appConfig: any;

  constructor(private http: HttpClient) {
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
}
