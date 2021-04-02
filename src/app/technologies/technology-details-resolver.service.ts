import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {Technology} from '../shared/interfaces/technology';

@Injectable()
export class TechnologyDetailsResolverService implements Resolve<[Technology, ClassificationFramework]> {
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Technology, ClassificationFramework]> {
    const id = route.params['platformId'];
    const category = route.params['category'];

    return forkJoin([
      this.dataService.getTechnology(id, true),
      this.dataService.getFrameworkForTechnologyType(category)
    ]);
  }
}
