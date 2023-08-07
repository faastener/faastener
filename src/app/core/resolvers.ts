import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {forkJoin, Observable} from "rxjs";
import {ClassificationFramework} from "../shared/interfaces/classification";
import {AbstractDataService} from "./services/abstract-data.service";
import {inject} from "@angular/core";
import {ConfigurationService} from "./services/configuration.service";
import {InfoResourceSection} from "../shared/interfaces/info";
import {Technology} from "../shared/interfaces/technology";
import {TechnologyFilterConfiguration} from "../shared/interfaces/filtering";

export const classificationFrameworkResolver: ResolveFn<ClassificationFramework | null> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationFramework | null> => {
    return inject(AbstractDataService).getLatestFrameworkForTechnologyType(inject(ConfigurationService).defaultTechnologyType);
  };

export const resourcesResolver: ResolveFn<InfoResourceSection[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InfoResourceSection[]> => {
    return inject(AbstractDataService).getInfoResources();
  };

export const technologyResolver: ResolveFn<Observable<[Technology[], ClassificationFramework, TechnologyFilterConfiguration]>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Technology[], ClassificationFramework, TechnologyFilterConfiguration]> => {
    const technologyType = inject(ConfigurationService).defaultTechnologyType;
    const dataService = inject(AbstractDataService);

    const technologies = dataService.getTechnologiesOfType(technologyType);
    const framework = dataService.getLatestFrameworkForTechnologyType(technologyType);
    const filter = dataService.getTechnologyFilter(technologyType);

    return forkJoin([technologies, framework, filter]);
  };

export const technologyDetailsResolver: ResolveFn<Observable<[Technology, ClassificationFramework]>> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<[Technology, ClassificationFramework]> => {
    const id = route.params["platformId"];
    const technologyType = inject(ConfigurationService).defaultTechnologyType;
    const dataService = inject(AbstractDataService);

    const technology = dataService.getTechnology(id);
    const framework = dataService.getLatestFrameworkForTechnologyType(technologyType);

    return forkJoin([technology, framework]);
  };
