import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {ClassificationFramework} from '../../shared/interfaces/classification';
import {Technology, TechnologyType} from '../../shared/interfaces/technology';
import {ClassificationFrameworkResponse, TechnologyResponse} from '../../shared/interfaces/responses';
import {InfoResourceSection} from '../../shared/interfaces/info';
import {AbstractDataService} from './abstract-data.service';
import {environment} from "../../../environments/environment";
import {CriterionFilterType, TechnologyFilterConfiguration} from "../../shared/interfaces/filtering";

@Injectable({
  providedIn: 'root'
})
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

  getLatestFrameworkForTechnologyType(technologyType: TechnologyType): Observable<ClassificationFramework> {
    return this.getFrameworks().pipe(
      map((frameworks) => {
          console.log(frameworks);
          const f: ClassificationFramework | undefined = frameworks.find(
            // currently returns the first found value, TODO: check version values
            (item) => item.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase());
          if (f) {
            return f;
          }
          return {
            id: "f.id",
            technologyType: TechnologyType.faas,
            name: "f.name",
            description: "f.description",
            version: '',
            frameworkViews: []
          };
        }
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  public getTechnologies(): Observable<Technology[]> {
    return this.http.get<TechnologyResponse[]>(this.apiUrl + '/api/technologies?withDossier=true')
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

              if (response.dossier) {
                technology.dossier = {
                  id: response.dossier.id,
                  technologyId: response.dossier.technologyId,
                  reviewDate: response.dossier.reviewDate,
                  reviewedCriteria: new Map(Object.entries(response.dossier.reviewedCriteria))
                };
              }

              result.push(technology);
            });
            return result;
          }
        ),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  public getTechnology(technologyId: string): Observable<Technology> {
    return this.http.get<TechnologyResponse>(this.apiUrl + '/api/technologies/' + technologyId + '?withDossier=true')
      .pipe(
        map((response) => {
            const technology: Technology = {
              id: response.id,
              technologyName: response.technologyName,
              technologyType: response.technologyType,
              logoLocation: response.logoLocation,
              shortDescription: response.shortDescription,
              description: response.description
            };

            if (response.dossier) {
              technology.dossier = {
                id: response.dossier.id,
                technologyId: response.dossier.technologyId,
                reviewDate: response.dossier.reviewDate,
                reviewedCriteria: new Map(Object.entries(response.dossier.reviewedCriteria))
              };
            }

            return technology;
          }
        ),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

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
    return this.http.get<InfoResourceSection[]>(this.apiUrl + '/api/infosections')
      .pipe(
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  /*getDossiers(): Observable<TechnologyDossier[]> {
    return this.http.get<TechnologyDossierResponse[]>(this.apiUrl + '/api/dossiers')
      .pipe(
        map((response) => {
            const result: TechnologyDossier[] = [];
            response.forEach((dossier) => {
              const d: TechnologyDossier = {
                id: dossier.id,
                technologyId: dossier.technologyId,
                reviewDate: dossier.reviewDate,
                reviewedCriteria: dossier.reviewedCriteria
              };

              result.push(d);
            });
            return result;
          }
        ),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }*/

  /*getDossiersForTechnologyType(technologyType: TechnologyType, withReviewData: boolean): Observable<TechnologyDossier[]> {
    return this.getDossiers(withReviewData).pipe(
      map((techs) =>
        techs.filter(t => t.technologyInfo.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }*/

  /*public getDossier(technologyId: string): Observable<TechnologyDossier | undefined> {
    console.log("technologyId=" + technologyId);

    return this.getDossiers().pipe(
      map((techs) =>
        techs.find(t => t.id === technologyId)
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }*/

  /*
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
  }*/

  getTechnologyFilter(technologyType: TechnologyType): any {
    return combineLatest([
      this.http.get<TechnologyFilterConfiguration[]>(this.apiUrl + '/api/filters').pipe(
        map((conf) => conf.find(c => c.technologyType.toLocaleLowerCase() === technologyType.toLocaleLowerCase())),
      ),
      this.getTechnologies()
    ]).pipe(
      map(([filter, technologies]) => {
          const values: Map<string, any[]> = new Map<string, any[]>();

          technologies.forEach(tech => {
            if (tech.dossier) {
              tech.dossier.reviewedCriteria.forEach((reviewData, id) => {
                const distinctValues: Set<any> = new Set();
                const previous: Set<any> = new Set(values.get(id));

                reviewData.forEach((v: any) => distinctValues.add(v.value));
                if (previous) {
                  values.set(id, Array.from(new Set([...previous, ...distinctValues])));
                } else {
                  values.set(id, Array.from(distinctValues.values()));
                }
              });
            }
          });

          if (filter) {
            filter.filters.forEach((f) => {
              if (f.filterType === CriterionFilterType.lte) {
                if (values.has(f.criterionTypeId)) {
                  const range: any[] | undefined = values.get(f.criterionTypeId)!.sort(((a, b) => a > b ? 1 : -1));
                  f.filterValues = [range[0], range[range.length - 1]];
                }
              } else if (f.filterType !== CriterionFilterType.bool) {
                if (values.has(f.criterionTypeId)) {
                  f.filterValues = values.get(f.criterionTypeId);
                }
              }
            });
          }

          return filter;
        }
      ),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }


}
