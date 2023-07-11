import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {ClassificationFramework} from '../shared/interfaces/classification';
import {forkJoin, Observable} from 'rxjs';
import {DataService} from '../core/services/data.service';
import {TechnologyDossier, TechnologyInfo} from '../shared/interfaces/dossier';
import {TechnologyFilterConfiguration} from '../shared/interfaces/filtering';
import {AppConfigService} from '../core/services/app-config.service';

@Injectable()
export class TechnologiesResolver implements Resolve<[TechnologyDossier[], ClassificationFramework, TechnologyFilterConfiguration]> {
  constructor(private dataService: DataService, private config: AppConfigService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[TechnologyDossier[], ClassificationFramework, TechnologyFilterConfiguration]> {
    const technologyType = this.config.defaultTechCategory;

    const technologies = this.dataService.getDossiersForTechnologyType(technologyType, true);
    const framework = this.dataService.getLatestFrameworkForTechnologyType(technologyType);
    const filter = this.dataService.getTechnologyFilter(technologyType);

    return forkJoin([technologies, framework, filter]);
  }
}
