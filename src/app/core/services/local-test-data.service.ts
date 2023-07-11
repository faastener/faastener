import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {LogoLocatorService} from './logo-locator.service';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {TechnologyDossier, TechnologyInfo, TechnologyType} from '../../shared/interfaces/dossier';
import {ClassificationFrameworkResponse, TechnologyDossierResponse} from '../../shared/interfaces/responses';
import {CriterionFilterType, TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {InfoResourceSection} from '../../shared/interfaces/info';
import {DataService} from './data.service';

const frameworksPath = '/assets/data_new/frameworks.json';
const dossiersPath = '/assets/data_new/dossiers.json';
const filterConfigurationsPath = '/assets/data_new/filters.json';
const infoResourcesPath = '/assets/data_new/resources.json';

@Injectable()
export class LocalTestDataService extends DataService {

  constructor(private http: HttpClient, private logoLocator: LogoLocatorService) {
    super();
  }

  getFrameworks(): Observable<ClassificationFramework[]> {
    return this.http.get<ClassificationFrameworkResponse[]>(frameworksPath)
      .pipe(
        map((frameworks) => {
          const result: ClassificationFramework[] = [];
          frameworks.forEach(f => {
            const framework: ClassificationFramework = {
              id: f.id,
              technologyType: f.technologyType,
              name: f.technologyName,
              description: f.description,
              version: '',
              frameworkViews: f.frameworkViews
            };

            result.push(framework);
          });

          return result;
        }),
        shareReplay(1),
        catchError(LocalTestDataService.handleError)
      );
  }

  getFrameworksForTechnologyType(technologyType: string): Observable<ClassificationFramework[]> {
    return this.getFrameworks().pipe(
      map((frameworks) => frameworks.filter(
        (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(LocalTestDataService.handleError)
    );
  }

  getLatestFrameworkForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework> {
    return this.getFrameworks().pipe(
      map((frameworks) => frameworks.find(
        // currently returns the first found value, TODO: check version values
        (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(LocalTestDataService.handleError)
    );
  }

  getDossiers(withReviewData: boolean): Observable<TechnologyDossier[]> {
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
                reviewedCriteria: null
              };

              if (withReviewData) {
                d.reviewedCriteria = dossier.reviewedCriteria;
              }

              result.push(d);
            });
            return result;
          }
        ),
        catchError(LocalTestDataService.handleError),
        shareReplay(1)
      );
  }

  getDossiersForTechnologyType(technologyType: TechnologyType, withReviewData: boolean): Observable<TechnologyDossier[]> {
    return this.getDossiers(withReviewData).pipe(
      map((techs) =>
        techs.filter(t => t.technologyInfo.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(LocalTestDataService.handleError)
    );
  }

  public getDossier(technologyId: string, withReviewData: boolean): Observable<TechnologyDossier> {
    console.log("technologyId=" + technologyId);

    return this.getDossiers(withReviewData).pipe(
      map((techs) =>
        techs.find(t => t.id === technologyId)
      ),
      shareReplay(1),
      catchError(LocalTestDataService.handleError)
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
        catchError(LocalTestDataService.handleError)
      );
  }

  getReviewedTechnologiesOfType(technologyType: TechnologyType): Observable<TechnologyInfo[]> {
    return this.getReviewedTechnologies()
      .pipe(
        map((items) => items.filter(
          (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
        ),
        shareReplay(1),
        catchError(LocalTestDataService.handleError)
      );
  }

  getTechnologyFilter(technologyType: TechnologyType): Observable<TechnologyFilterConfiguration> {
    return combineLatest([
      this.http.get<TechnologyFilterConfiguration[]>(filterConfigurationsPath).pipe(
        map((conf) => conf.find(c => c.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())),
      ),
      this.getDossiersForTechnologyType(technologyType, true)
    ]).pipe(
      map(([filter, dossiers]) => {
          const criteriaValues = new Map<string, Set<any>>();
          dossiers.forEach(d => {

            d.reviewedCriteria.forEach((criterionInstance) => {
              const distinctValues = new Set<any>();
              const previous: Set<any> = criteriaValues.get(criterionInstance.typeId);

              criterionInstance.values.forEach(v => distinctValues.add(v.value));
              if (previous) {
                criteriaValues.set(criterionInstance.typeId, new Set([...previous, ...distinctValues]));
              } else {
                criteriaValues.set(criterionInstance.typeId, distinctValues);
              }
            });
          });

          filter.filters.forEach((f) => {
            if (f.filterType === CriterionFilterType.lte) {
              const range: number[] = Array.from(criteriaValues.get(f.criterionTypeId)).sort(((a, b) => a > b ? 1 : -1));
              f.filterValues = [range[0], range[range.length - 1]];
            } else if (f.filterType !== CriterionFilterType.bool) {
              f.filterValues = Array.from(criteriaValues.get(f.criterionTypeId).values());
            }
          });
          return filter;
        }
      ),
      catchError(LocalTestDataService.handleError),
      shareReplay(1)
    );
  }

  getInfoResources(): Observable<InfoResourceSection[]> {
    return this.http.get<InfoResourceSection[]>(infoResourcesPath)
      .pipe(
        catchError(LocalTestDataService.handleError),
        shareReplay(1)
      );
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
}
