import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {Technology} from '../shared/interfaces/technology';
import {TechnologyFilterConfiguration} from '../shared/interfaces/filtering';

@Injectable()
export class TechnologiesResolver implements Resolve<[Technology[], ClassificationFramework, TechnologyFilterConfiguration]> {
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Technology[], ClassificationFramework, TechnologyFilterConfiguration]> {
    const category = route.params['category'];

    return forkJoin([
      this.dataService.getTechnologiesOfCategory(category, true),
      this.dataService.getFrameworkForTechnologyType(category),
      this.dataService.getTechnologyFilter(category)
    ]);
  }
}
