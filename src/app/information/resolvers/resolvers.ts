import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ClassificationFramework} from "../../shared/interfaces/classification";
import {DataService} from "../../core/services/data.service";
import {inject} from "@angular/core";
import {ConfigurationService} from "../../core/services/configuration.service";
import {InfoResourceSection} from "../../shared/interfaces/info";

export const classificationFrameworkResolver: ResolveFn<ClassificationFramework | null> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClassificationFramework | null> => {
    return inject(DataService).getLatestFrameworkForTechnologyType(inject(ConfigurationService).defaultTechCategory);
  }

export const resourcesResolver: ResolveFn<InfoResourceSection[]> =
  (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<InfoResourceSection[]> => {
    return inject(DataService).getInfoResources();
  }
