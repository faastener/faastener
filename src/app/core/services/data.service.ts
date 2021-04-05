import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, throwError} from 'rxjs';
import {catchError, map, mergeAll, mergeMap, shareReplay, take, toArray} from 'rxjs/operators';
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
  CriteriaGroupingResponse, TechnologyDossierResponse
} from '../../shared/interfaces/responses';
import {CriterionFilterType, TechnologyFilterConfiguration} from '../../shared/interfaces/filtering';
import {InfoResourceSection} from '../../shared/interfaces/info';

const criteriaPath = '/assets/data/framework/criteria.json';
const criteriaGroupingsPath = '/assets/data/framework/groupings.json';
const frameworkViewsPath = '/assets/data/framework/views.json';
const frameworkViewCombinationsPath = '/assets/data/framework/view-combinations.json';
const frameworksPath = '/assets/data/framework/frameworks.json';
const supportedPlatformsPath = '/assets/data/platforms/platforms.json';
const dossiersPath: string = '/assets/data/platforms/';
const filterConfigurationsPath = '/assets/data/framework/filters.json';
const infoResourcesPath = '/assets/data/info/resources.json';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private logoLocator: LogoLocatorService) {
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
            technologyCategory: f.technologyCategory,
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

  getFrameworkForCategory(techCategory: TechnologyCategory): Observable<ClassificationFramework> {
    return combineLatest([
      this.getViewCombinations(),
      this.http.get<ClassificationFrameworkResponse[]>(frameworksPath)
    ]).pipe(
      map(([combs, frameworks]) => {
        let result: ClassificationFramework;
        let f = frameworks.find(f => f.technologyCategory === techCategory);

        result = {
          id: f.id,
          technologyCategory: f.technologyCategory,
          name: f.name,
          description: f.description,
          viewCombinations: new Set<ClassificationViewCombination>()
        };

        f.viewCombinationIds.forEach(id => {
          let viewCombination = combs.find(v => id === v.id);
          if (viewCombination) {
            result.viewCombinations.add(viewCombination);
          }
        });

        return result;
      }),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getFrameworkForTechnologyType(category: string): Observable<ClassificationFramework> {
    return this.getFrameworks().pipe(
      map((f) => f.find(item => item.technologyCategory.toLocaleLowerCase() === category.toLocaleLowerCase())),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getTechnologies(withDossier = false): Observable<Technology[]> {
    return this.http.get<Technology[]>(supportedPlatformsPath)
      .pipe(
        map((items) =>
          items.map(
            item => {
              let result: Technology = {
                ...item,
                logoLocation: this.logoLocator.getLogoPath(item.logoLocator)
              };
              if (withDossier) {
                this.getDossier(item.id).pipe(take(1)).subscribe({
                  next: value => value ? result.dossier = value : false,
                  error: catchError
                });
              }
              return result;
            }
          )
        ),
        shareReplay(1),
        catchError(DataService.handleError)
      );
  }

  getTechnologiesOfCategory(category: string, withDossier = false): Observable<Technology[]> {
    return this.getTechnologies(withDossier).pipe(
      map((techs) =>
        techs.filter(t => t.category.toLocaleLowerCase() === category.toLocaleLowerCase())
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getTechnology(id: string, withDossier = false): Observable<Technology> {
    return combineLatest([
      this.http.get<Technology[]>(supportedPlatformsPath),
      this.getDossier(id)
    ]).pipe(
      map(([items, dossier]) => {
          let technology: Technology = items.find(item => item.id === id);
          let result: Technology = {
            ...technology,
            logoLocation: this.logoLocator.getLogoPath(technology.logoLocator)
          };
          if (withDossier) {
            result.dossier = dossier;
          }
          return result;
        }
      ),
      shareReplay(1),
      catchError(DataService.handleError)
    );

  }

  getDossier(technologyId: string): Observable<TechnologyDossier> {
    const dossierPath = dossiersPath.concat(technologyId, '.json');
    return this.http.get<TechnologyDossierResponse>(dossierPath)
      .pipe(
        map( (res) => {
          return {
            platformId: technologyId,
            reviewDate: res.reviewDate,
            reviewedCriteria: new Map(Object.entries(res.reviewedCriteria))
          } as TechnologyDossier;
        }),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  getDossiersOfCategory(category: string): Observable<TechnologyDossier[]> {
    return this.getTechnologiesOfCategory(category).pipe(
      mergeMap((techs) => techs),
      mergeMap((t) => this.getDossier(t.id)),
      toArray(),
      shareReplay(1),
      catchError(DataService.handleError)
    );
  }

  getTechnologyFilter(category: TechnologyCategory): Observable<TechnologyFilterConfiguration> {
    return combineLatest([
      this.http.get<TechnologyFilterConfiguration[]>(filterConfigurationsPath).pipe(
        map((conf) => conf.find(c => c.technologyCategory.toLocaleLowerCase() === category.toLocaleLowerCase())),
      ),
      this.getDossiersOfCategory(category)
    ]).pipe(
      map(([filter, dossiers]) => {
          const criteriaValues = new Map<string, Set<any>>();
          dossiers.forEach(d => {

            d.reviewedCriteria.forEach((criterionInstance, key) => {
              const distinctValues = new Set<any>();
              const previous: Set<any> = criteriaValues.get(key);

              criterionInstance.values.forEach(v => distinctValues.add(v.value));
              if (previous) {
                criteriaValues.set(key, new Set([...previous, ...distinctValues]));
              } else {
                criteriaValues.set(key, distinctValues);
              }
            });
          });

          filter.filters.forEach((f) => {
            if (f.filterType === CriterionFilterType.lte) {
              const range: number[] = Array.from(criteriaValues.get(f.criterionId)).sort(((a, b) => a > b ? 1 : -1));
              f.filterValues = [range[0], range[range.length - 1]];
            } else if (f.filterType !== CriterionFilterType.bool) {
              f.filterValues = Array.from(criteriaValues.get(f.criterionId).values());
            }
          });
          return filter;
        }
      ),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getFrameworkGroupingsData(frameworkId: string): Observable<CriteriaGroupingResponse[]> {
    return this.getDefaultViewCombinationData(frameworkId).pipe(
      mergeMap((vc) => this.getViewsData(vc.id)),
      mergeAll(),
      mergeMap(v => this.getViewGroupingsData(v.id)),
      mergeAll(),
      toArray(),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getDefaultViewCombinationData(frameworkId: string): Observable<ClassificationViewCombinationResponse> {
    return combineLatest([
      this.http.get<ClassificationViewCombinationResponse[]>(frameworkViewCombinationsPath),
      this.http.get<ClassificationFrameworkResponse[]>(frameworksPath),
    ]).pipe(
      map(([vcs, fws]) => {
        const vcLookup = new Map(vcs.map(vc => [vc.id, vc] as [string, ClassificationViewCombinationResponse]));
        let framework = fws.find(f => f.id === frameworkId);
        if (framework) {
          for (let id of framework.viewCombinationIds) {
            let temp = vcLookup.get(id);
            if (temp && temp.default) {
              return temp;
            }
          }
        }
      }),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getViewsData(viewCombinationId: string): Observable<ClassificationViewResponse[]> {
    return combineLatest([
      this.http.get<ClassificationViewCombinationResponse[]>(frameworkViewCombinationsPath),
      this.http.get<ClassificationViewResponse[]>(frameworkViewsPath)
    ]).pipe(
      map(([combs, views]) => {
        const viewsLookup = new Map(views.map(v => [v.id, v] as [string, ClassificationViewResponse]));
        let result = [];
        let vc = combs.find(c => c.id === viewCombinationId);
        if (vc) {
          vc.viewIds.forEach(id => result.push(viewsLookup.get(id)));
        }
        return result;
      }),
      catchError(DataService.handleError),
      shareReplay(1)
    );
  }

  getViewGroupingsData(viewId: string): Observable<CriteriaGroupingResponse[]> {
    return combineLatest([
      this.http.get<ClassificationViewResponse[]>(frameworkViewsPath),
      this.http.get<CriteriaGroupingResponse[]>(criteriaGroupingsPath)])
      .pipe(
        map(([views, groupings]) => {
          const groupingsLookup = new Map(groupings.map(g => [g.id, g] as [string, CriteriaGroupingResponse]));
          let result = [];
          let view = views.find(v => v.id === viewId);
          if (view) {
            view.groupingIds.forEach(id => result.push(groupingsLookup.get(id)));
          }
          return result;
        }),
        catchError(DataService.handleError),
        shareReplay(1)
      );
  }

  getInfoResources(): Observable<InfoResourceSection[]> {
    return this.http.get<InfoResourceSection[]>(infoResourcesPath)
      .pipe(
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
