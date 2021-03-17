import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';

@Injectable()
export class FrameworkResolver implements Resolve<ClassificationFramework> {
  private readonly defaultFrameworkId = 'framework:faas';

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationFramework> {
    const id = route.paramMap.get('id');
    if (id && isNaN(+id)) {
      console.error('Load some other, not default framework. Currently not supported');
    }

    return this.dataService.getFramework(this.defaultFrameworkId);
  }
}
