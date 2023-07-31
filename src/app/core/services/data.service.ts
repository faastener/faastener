import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {Technology, TechnologyType} from '../../shared/interfaces/technology';
import {ClassificationFrameworkResponse, TechnologyResponse} from '../../shared/interfaces/responses';
import {InfoResourceSection} from '../../shared/interfaces/info';
import {AbstractDataService} from './abstract-data.service';
import {environment} from "../../../environments/environment";

const infoResourcesPath = '/assets/test-data/resources.json';

@Injectable()
export class DataService extends AbstractDataService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {
    super();
  }

  private static handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body?.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  getFrameworks(): Observable<ClassificationFramework[]> {
    return this.http.get<ClassificationFrameworkResponse[]>(this.apiUrl + '/api/frameworks')
      .pipe(
        map((frameworks) => {
          const result: ClassificationFramework[] = [];
          frameworks.forEach(f => {
            const framework: ClassificationFramework = {
              id: f.id,
              technologyType: f.technologyType,
              name: f.name,
              description: f.description,
              version: '',
              frameworkViews: f.frameworkViews
            };

            result.push(framework);
          });

          return result;
        }),
        shareReplay(1),
        catchError(DataService.handleError)
      );
  }

  getFrameworksForTechnologyType(technologyType: string): Observable<ClassificationFramework[]> {
    return this.getFrameworks().pipe(
      map((frameworks) => frameworks.filter(
        (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getLatestFrameworkForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework | null> {
    return this.getFrameworks().pipe(
      map((frameworks) => {
          const f: ClassificationFramework | undefined = frameworks.find(
            // currently returns the first found value, TODO: check version values
            (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase());
          if (f) {
            return f;
          } else {
            return null;
          }
        }
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  public getTechnologies(): Observable<Technology[]> {
    return this.http.get<TechnologyResponse[]>(this.apiUrl + '/api/technologies')
      .pipe(
        map((response) => {
            const result: Technology[] = [];
            response.forEach((response) => {
              const technology: Technology = {
                id: response.id,
                technologyName: response.technologyName,
                technologyType: response.technologyType,
                logoLocation: response.logoLocation,
                shortDescription: response.shortDescription,
                description: response.description
              };

              result.push(technology);
            });
            return result;
          }
        ),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  /*getDossiers(withReviewData: boolean): Observable<TechnologyDossier[]> {
    return this.http.get<TechnologyDossierResponse[]>(dossiersPath)
      .pipe(
        map((response) => {
            const result: TechnologyDossier[] = [];
            response.forEach((dossier) => {
              const d: TechnologyDossier = {
                id: dossier.id,
                technologyName: dossier.technologyName,
                reviewDate: dossier.reviewDate,
                technologyInfo: dossier.technologyInfo,
                reviewedCriteria: []
              };

              if (withReviewData) {
                d.reviewedCriteria = dossier.reviewedCriteria;
              }

              result.push(d);
            });
            return result;
          }
        ),
        catchError(TestDataService.handleError),
        shareReplay(1)
      );
  }

  getDossiersForTechnologyType(technologyType: TechnologyType, withReviewData: boolean): Observable<TechnologyDossier[]> {
    return this.getDossiers(withReviewData).pipe(
      map((techs) =>
        techs.filter(t => t.technologyInfo.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(TestDataService.handleError)
    );
  }

  public getDossier(technologyId: string, withReviewData: boolean): Observable<TechnologyDossier | undefined> {
    console.log("technologyId=" + technologyId);

    return this.getDossiers(withReviewData).pipe(
      map((techs) =>
        techs.find(t => t.id === technologyId)
      ),
      shareReplay(1),
      catchError(TestDataService.handleError)
    );
  }

  getReviewedTechnologies(): Observable<TechnologyInfo[]> {
    return this.http.get<TechnologyDossierResponse[]>(dossiersPath)
      .pipe(
        map((items) => {
            const result: TechnologyInfo[] = [];
            items.forEach((item) => {
              const info: TechnologyInfo = {
                ...item.technologyInfo,
                logoLocation: this.logoLocator.getLogoPath(item.technologyInfo.logoLocator)
              };
              result.push(info);
            });
            return result;
          }
        ),
        shareReplay(1),
        catchError(TestDataService.handleError)
      );
  }

  getReviewedTechnologiesOfType(technologyType: TechnologyType): Observable<TechnologyInfo[]> {
    return this.getReviewedTechnologies()
      .pipe(
        map((items) => items.filter(
          (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
        ),
        shareReplay(1),
        catchError(TestDataService.handleError)
      );
  }

  getTechnologyFilter(technologyType: TechnologyType): Observable<TechnologyFilterConfiguration> {
    /!*return combineLatest([
      this.http.get<TechnologyFilterConfiguration[]>(filterConfigurationsPath).pipe(
        map((conf) => conf.find(c => c.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())),
      ),
      this.getDossiersForTechnologyType(technologyType, true)
    ]).pipe(
      map(([filter, dossiers]) => {
          const criteriaValues = new Map<string, any[]>();
          dossiers.forEach(d => {

            d.reviewedCriteria.forEach((criterionInstance) => {
              const distinctValues: any[] = [];
              const previous: any[] | undefined = criteriaValues.get(criterionInstance.typeId);

              criterionInstance.values.forEach(v => distinctValues.push(v.value));
              if (previous) {
                criteriaValues.set(criterionInstance.typeId, [...previous, ...distinctValues]);
              } else {
                criteriaValues.set(criterionInstance.typeId, distinctValues);
              }
            });
          });

          if (filter) {
            filter.filters.forEach((f) => {
              if (f.filterType === CriterionFilterType.lte) {
                const range: any[] = criteriaValues.get(f.criterionTypeId).sort(((a, b) => a > b ? 1 : -1));
                f.filterValues = [range[0], range[range.length - 1]];
              } else if (f.filterType !== CriterionFilterType.bool) {
                f.filterValues = criteriaValues.get(f.criterionTypeId).values();
              }
            });
          }

          return filter;
        }
      ),
      catchError(LocalTestDataService.handleError),
      shareReplay(1)
    );*!/

    return EMPTY;
  }*/

  public getTechnologiesOfType(technologyType: TechnologyType): Observable<Technology[]> {
    return this.getTechnologies().pipe(
      map((techs) =>
        techs.filter(t => t.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getInfoResources(): Observable<InfoResourceSection[]> {
    return this.http.get<InfoResourceSection[]>(infoResourcesPath)
      .pipe(
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }
}
