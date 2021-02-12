import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {CriterionModel} from '../../shared/data-models/classification/criterion.model';
import {CriteriaGroupingModel} from '../../shared/data-models/classification/criteria-grouping.model';
import {FaaSPlatform, FaaSPlatformBuilder} from '../../shared/data-models/core/faas-platform.model';
import {SearchCriteria} from '../../shared/data-models/core/search-criteria.model';
import {ClassificationScopeModel} from '../../shared/data-models/classification/classification-scope.model';
import {FrameworkModel} from '../../shared/data-models/classification/framework.model';
import {catchError, filter, map} from 'rxjs/operators';
import {FaasPlatformModel} from '../../shared/data-models/faas-platform/faas-platform.model';
import {LogoLocatorService} from './logo-locator.service';

const platformData: string[] = [
  '/assets/data/aws-lambda.json',
  '/assets/data/azure-functions.json',
  '/assets/data/google-cloud-functions.json',
  '/assets/data/apache-openwhisk.json',
  '/assets/data/fission.json',
  '/assets/data/fn.json',
  '/assets/data/knative.json',
  '/assets/data/kubeless.json',
  '/assets/data/nuclio.json',
  '/assets/data/openfaas.json'
];

const criteriaAssetPath = '/assets/data/framework/criteria.json';
const criteriaGroupingsPath = '/assets/data/framework/groupings.json';
const frameworkViewsPath = '/assets/data/framework/views.json';
const frameworksPath = '/assets/data/framework/frameworks.json';
const platformsPath = '/assets/data/platforms/platforms.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly platformLogoDir = '/assets/images/vendor/platforms/';
  platforms: FaaSPlatform[];
  platformsMap: Map<string, FaaSPlatform>;
  searchCriteria: SearchCriteria;

  constructor(private http: HttpClient, private logoLocator: LogoLocatorService) {
    this.platforms = [];
    this.platformsMap = new Map<string, FaaSPlatform>();
    this.searchCriteria = new SearchCriteria();
    // this.queryPlatformsData();
  }

  private static handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  queryPlatformsData() {
    // TODO: simplify querying the data
    platformData.forEach(path => {
      this.http.get<FaaSPlatform>(path)
        .subscribe(data => {
          const logoPath = this.platformLogoDir.concat(data.logoPath);
          const p = new FaaSPlatformBuilder()
            .platformName(data.platformName)
            .logoPath(logoPath)
            .description(data.description)
            .descriptionOfficial(data.descriptionOfficial)
            .businessView(data.businessView)
            .technicalView(data.technicalView)
            .build();
          this.platforms.push(p);
          this.platformsMap.set(p.id, p);
          this.populateSearchCriteria(p);
        });
    });
  }

  populateSearchCriteria(p: FaaSPlatform): void {
    this.searchCriteria.addLicensingCriteria(p.businessView.licensing);
    this.searchCriteria.addInstallationCriteria(p.businessView.installations);
    this.searchCriteria.addCodeCriteria(p.businessView.sourceCode);
    this.searchCriteria.addInterfaceCriteria(p.businessView.interfaces);
    this.searchCriteria.addDocumentationCriteria(p.businessView.documentation);
    this.searchCriteria.addQuotaCriteria(p.technicalView.development.quotas);
    this.searchCriteria.addDevelopmentCriteria(p.technicalView.development);
    this.searchCriteria.addVersioningCriteria(p.technicalView.versioning);
    this.searchCriteria.addEventSourcesCriteria(p.technicalView.eventSources);
  }

  getPlatforms(): FaaSPlatform[] {
    return this.platforms;
  }

  getPlatform(id: string) {
    return this.platformsMap.get(id);
  }

  getSearchCriteria(): SearchCriteria {
    return this.searchCriteria;
  }

  // ========================== new methods ====================================


  getCriteria(): Observable<CriterionModel[]> {
    return this.http.get<CriterionModel[]>(criteriaAssetPath)
      .pipe(
        catchError(DataService.handleError)
      );
  }

  getGroupings(): Observable<CriteriaGroupingModel[]> {
    return this.http.get<CriteriaGroupingModel[]>(criteriaGroupingsPath)
      .pipe(
        catchError(DataService.handleError)
      );
  }

  getViews(): Observable<ClassificationScopeModel[]> {
    return this.http.get<ClassificationScopeModel[]>(frameworkViewsPath)
      .pipe(
        catchError(DataService.handleError)
      );
  }

  getFrameworks(): Observable<FrameworkModel[]> {
    return this.http.get<FrameworkModel[]>(frameworksPath)
      .pipe(
        catchError(DataService.handleError)
      );
  }

  getFramework(id: string): Observable<FrameworkModel> {
    return this.getFrameworks().pipe(
      filter((f: FrameworkModel) => f.id === id)[0],
      catchError(DataService.handleError)
    );
  }

  getSupportedPlatforms(): Observable<FaasPlatformModel[]> {
    return this.http.get<FaasPlatformModel[]>(platformsPath)
      .pipe(
        map((platforms) => platforms.map(
          platform => ({
            ...platform,
            logoLocation: this.logoLocator.getLogoPath(platform.logoLocator)
          }) as FaasPlatformModel)
        ),
        catchError(DataService.handleError)
      );
  }
}
