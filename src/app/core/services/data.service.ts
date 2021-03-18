import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, throwError} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {LogoLocatorService} from './logo-locator.service';
import {
  ClassificationCriterion,
  ClassificationFramework,
  ClassificationView,
  ClassificationViewCombination,
  CriteriaGrouping
} from '../../shared/interfaces/classification';
import {Technology, TechnologyCategory, TechnologyDossier} from '../../shared/interfaces/technology';
import {
  ClassificationFrameworkResponse,
  ClassificationViewCombinationResponse,
  ClassificationViewResponse,
  CriteriaGroupingResponse
} from '../../shared/interfaces/responses';
import {TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';

const criteriaPath = '/assets/data/framework/criteria.json';
const criteriaGroupingsPath = '/assets/data/framework/groupings.json';
const frameworkViewsPath = '/assets/data/framework/views.json';
const frameworkViewCombinationsPath = '/assets/data/framework/view-combinations.json';
const frameworksPath = '/assets/data/framework/frameworks.json';
const supportedPlatformsPath = '/assets/data/platforms/platforms.json';
const dossiersPath: string = '/assets/data/platforms/';
const filterConfigurationsPath = '/assets/data/framework/filters.json';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private logoLocator: LogoLocatorService) {
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

  getCriteria(): Observable<ClassificationCriterion[]> {
    return this.http.get<ClassificationCriterion[]>(criteriaPath)
      .pipe(
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  getGroupings(): Observable<CriteriaGrouping[]> {
    return combineLatest([
      this.getCriteria(),
      this.http.get<CriteriaGroupingResponse[]>(criteriaGroupingsPath)
    ]).pipe(
      map(([criteria, groupings]) => {
        const criteriaLookup = new Map(criteria.map(c => [c.id, c] as [string, ClassificationCriterion]));
        return this.buildGroupings(groupings, criteriaLookup);
      }),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getViews(): Observable<ClassificationView[]> {
    return combineLatest([
      this.getGroupings(),
      this.http.get<ClassificationViewResponse[]>(frameworkViewsPath)
    ]).pipe(
      map(([groupings, views]) => {
          const groupingsLookup = new Map(groupings.map(c => [c.id, c] as [string, CriteriaGrouping]));
          let result: ClassificationView[] = [];

          views.forEach(v => {
            let view: ClassificationView = {
              id: v.id,
              name: v.name,
              description: v.description,
              groupings: new Set<CriteriaGrouping>()
            };

            v.groupingIds.forEach(id => {
              if (groupingsLookup.has(id)) {
                view.groupings.add(groupingsLookup.get(id));
              }
            });
            result.push(view);
          });

          return result;
        }
      ),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getViewCombinations(): Observable<ClassificationViewCombination[]> {
    return combineLatest([
      this.getViews(),
      this.http.get<ClassificationViewCombinationResponse[]>(frameworkViewCombinationsPath)
    ]).pipe(
      map(([views, viewCombinations]) => {
          let result: ClassificationViewCombination[] = [];
          viewCombinations.forEach(c => {
            let combination: ClassificationViewCombination = {
              id: c.id,
              name: c.name,
              description: c.description,
              default: c.default,
              views: new Set<ClassificationView>()
            };

            c.viewIds.forEach(id => {
              let view = views.find(v => id === v.id);
              if (view) {
                combination.views.add(view);
              }
            });
            result.push(combination);
          });

          return result;
        }
      ),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getFrameworks(): Observable<ClassificationFramework[]> {
    return combineLatest([
      this.getViewCombinations(),
      this.http.get<ClassificationFrameworkResponse[]>(frameworksPath)
    ]).pipe(
      map(([combs, frameworks]) => {
        let result: ClassificationFramework[] = [];
        frameworks.forEach(f => {
          let framework: ClassificationFramework = {
            id: f.id,
            techCategory: f.techCategory,
            name: f.name,
            description: f.description,
            viewCombinations: new Set<ClassificationViewCombination>()
          };

          f.viewCombinationIds.forEach(id => {
            let viewCombination = combs.find(v => id === v.id);
            if (viewCombination) {
              framework.viewCombinations.add(viewCombination);
            }
          });
          result.push(framework);
        });

        return result;
      }),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getFramework(frameworkId: string): Observable<ClassificationFramework> {
    return this.getFrameworks().pipe(
      map((f) => f.find(item => item.id === frameworkId)),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getFrameworkQuery(frameworkId: string): Observable<ClassificationFramework> {
    return null;
  }

  getTechnologies(withDossier = false): Observable<Technology[]> {
    if (withDossier) {
      return this.http.get<Technology[]>(supportedPlatformsPath)
        .pipe(
          map((items) =>
            items.map(
              item => {
                let result: Technology = {
                  ...item,
                  logoLocation: this.logoLocator.getLogoPath(item.logoLocator)
                };
                this.getDossier(item.id).subscribe({next: value => value ? result.dossier = value : false, error: catchError});
                return result;
              }
            )
          ),
          shareReplay(1),
          catchError(DataService.handleError)
        );
    } else {
      return this.http.get<Technology[]>(supportedPlatformsPath)
        .pipe(
          map((platforms) => platforms.map(
            platform => ({
              ...platform,
              logoLocation: this.logoLocator.getLogoPath(platform.logoLocator)
            }) as Technology)
          ),
          shareReplay(1),
          catchError(DataService.handleError)
        );
    }
  }

  getTechnology(id: string, withDossier = false): Observable<Technology> {
    return this.getTechnologies()
      .pipe(
        map((techs) => {
            let t: Technology = techs.find(t => t.id === id);
            if (t && withDossier) {
              this.getDossier(t.id).subscribe({next: value => value ? t.dossier = value : false, error: catchError});
            }
            return t;
          }
        ),
        shareReplay(1),
        catchError(DataService.handleError)
      );
  }

  getDossier(technologyId: string): Observable<TechnologyDossier> {
    const dossierPath = dossiersPath.concat(technologyId, '.json');
    return this.http.get<TechnologyDossier>(dossierPath)
      .pipe(
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  getFilterConfigurations(category: TechnologyCategory): Observable<TechnologyFilterConfiguration[]> {
    return this.http.get<TechnologyFilterConfiguration[]>(filterConfigurationsPath)
      .pipe(
        map((conf) => conf.filter(c => c.technologyCategory === category)),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  getFilterConfiguration(category: TechnologyCategory, filterName: string): Observable<TechnologyFilterConfiguration[]> {
    return this.http.get<TechnologyFilterConfiguration[]>(filterConfigurationsPath)
      .pipe(
        map((conf) => conf.filter(c => c.technologyCategory === category && c.name === filterName)),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  private buildGroupings(data: CriteriaGroupingResponse[], criteria: Map<string, ClassificationCriterion>): CriteriaGrouping[] {
    const result: CriteriaGrouping[] = [];
    const lookup: Map<string, CriteriaGrouping> = new Map<string, CriteriaGrouping>();

    data.forEach(g => {
        let relatedCriteria: Set<ClassificationCriterion> = new Set<ClassificationCriterion>();
        if (g.criteriaIds) {
          g.criteriaIds.forEach(id => criteria.has(id) ? relatedCriteria.add(criteria.get(id)) : false);
        }
        lookup.set(g.id, ({
          id: g.id,
          name: g.name,
          locator: g.locator,
          groupings: new Set<CriteriaGrouping>(),
          criteria: relatedCriteria
        } as CriteriaGrouping));
      }
    );

    data.forEach(g => {
      if (g.parentId) {
        lookup.get(g.parentId).groupings.add(lookup.get(g.id));
      } else {
        result.push(lookup.get(g.id));
      }
    });

    return result;
  }
}
