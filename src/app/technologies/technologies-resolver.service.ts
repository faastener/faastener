import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {Technology} from '../shared/interfaces/technology';
import {TechnologyFilterConfiguration} from '../shared/interfaces/filtering';
import {switchMap} from 'rxjs/operators';
import {CriteriaGroupingResponse} from '../shared/interfaces/responses';

@Injectable()
export class TechnologiesResolver implements Resolve<[Technology[], ClassificationFramework, TechnologyFilterConfiguration, CriteriaGroupingResponse[]]> {
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Technology[], ClassificationFramework, TechnologyFilterConfiguration, CriteriaGroupingResponse[]]> {
    const category = route.params['category'];
    const technologies = this.dataService.getTechnologiesOfCategory(category, true);
    const framework = this.dataService.getFrameworkForTechnologyType(category);
    const filter = this.dataService.getTechnologyFilter(category);
    const groupingsData = framework.pipe(
      switchMap(f => this.dataService.getFrameworkGroupingsData(f.id))
    );

    return forkJoin([technologies, framework, filter, groupingsData]);
  }
}
