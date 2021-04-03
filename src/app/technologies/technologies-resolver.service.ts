import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {Technology} from '../shared/interfaces/technology';
import {TechnologyFilterConfiguration} from '../shared/interfaces/filtering';
import {AppConfigService} from '../core/services/app-config.service';

@Injectable()
export class TechnologiesResolver implements Resolve<[Technology[], ClassificationFramework, TechnologyFilterConfiguration]> {
  constructor(private dataService: DataService, private config: AppConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Technology[], ClassificationFramework, TechnologyFilterConfiguration]> {
    let category = this.config.defaultTechCategory;

    const technologies = this.dataService.getTechnologiesOfCategory(category, true);
    const framework = this.dataService.getFrameworkForTechnologyType(category);
    const filter = this.dataService.getTechnologyFilter(category);

    return forkJoin([technologies, framework, filter]);
  }
}
