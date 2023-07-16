import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TestDataService} from "./test-data.service";
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class ConfigurationService {
  private configuration: any = {};

  constructor(private http: HttpClient) {
  }

  load(): Observable<void> {
    return this.http.get('/assets/config.json')
      .pipe(
        tap((configuration: any) => this.configuration = configuration),
        map(() => undefined)
      );
  }

  getValue(key: string, defaultValue?: any): any {
    return this.configuration[key] || defaultValue;
  }

  get defaultTechCategory() {
    return this.getValue("defaultTechCategory");
  }

  get repositoryMode() {
    return this.getValue("repositoryMode");
  }

  public dataServiceFactory() {
    if (this.repositoryMode === 'file' || !this.repositoryMode) {
      return new TestDataService(this.http);
    } else {
      // other repository implementations
      return undefined;
    }
  }
}
