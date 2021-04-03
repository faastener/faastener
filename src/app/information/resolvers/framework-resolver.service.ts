import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {Observable} from 'rxjs';
import {DataService} from '../../core/services/data.service';
import {AppConfigService} from '../../core/services/app-config.service';

@Injectable()
export class FrameworkResolver implements Resolve<ClassificationFramework> {

  constructor(private dataService: DataService, private config: AppConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationFramework> {
    let defaultCategory = this.config.defaultTechCategory;
    return this.dataService.getFrameworkForCategory(defaultCategory);
  }
}
