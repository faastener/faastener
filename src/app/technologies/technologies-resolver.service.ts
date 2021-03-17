import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {Technology} from '../shared/interfaces/technology';

@Injectable()
export class TechnologiesResolver implements Resolve<Technology[]> {
  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Technology[]> {
    return this.dataService.getTechnologies(true);
  }
}
