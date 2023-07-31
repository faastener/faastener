import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class ConfigurationService {
  private configuration: any = {};

  constructor(private http: HttpClient) {
  }

  get defaultTechnologyType() {
    return this.getValue("defaultTechType");
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
}
