import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ClassificationFramework} from "../shared/interfaces/classification";
import {AbstractDataService} from "./services/abstract-data.service";
import {inject} from "@angular/core";
import {ConfigurationService} from "./services/configuration.service";
import {InfoResourceSection} from "../shared/interfaces/info";

export const classificationFrameworkResolver: ResolveFn<ClassificationFramework | null> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationFramework | null> => {
    return inject(AbstractDataService).getLatestFrameworkForTechnologyType(inject(ConfigurationService).defaultTechnologyType);
  }

export const resourcesResolver: ResolveFn<InfoResourceSection[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InfoResourceSection[]> => {
    return inject(AbstractDataService).getInfoResources();
  }
