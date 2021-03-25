import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {InfoResourceSection} from '../shared/interfaces/info';

@Injectable()
export class ResourcesResolver implements Resolve<InfoResourceSection[]> {

  constructor(private dataService: DataService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InfoResourceSection[]> {
    return this.dataService.getInfoResources();
  }
}
