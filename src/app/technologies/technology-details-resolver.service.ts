import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {TechnologyDossier} from '../shared/interfaces/dossier';
import {AppConfigService} from '../core/services/app-config.service';

@Injectable()
export class TechnologyDetailsResolverService implements Resolve<[TechnologyDossier, ClassificationFramework]> {
  constructor(private dataService: DataService, private config: AppConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[TechnologyDossier, ClassificationFramework]> {
    const id = route.params.platformId;
    const category = this.config.defaultTechCategory;

    return forkJoin([
      this.dataService.getDossier(id, true),
      this.dataService.getLatestFrameworkForTechnologyType(category)
    ]);
  }
}
