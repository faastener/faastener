import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';

@Injectable()
export class FrameworkResolver implements Resolve<ClassificationFramework[]> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationFramework[]> {
    return this.dataService.getFrameworks();
  }
}
