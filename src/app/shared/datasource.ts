import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {Technology} from './interfaces/technology';
import {PageEvent} from '@angular/material/paginator';
import {CriteriaBasedQuery, CriterionFilterType, CriterionFilterValue} from './interfaces/filtering';

export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;

  disconnect(): void;
}

export interface Sort<T> {
  property: keyof T
  order: 'asc' | 'desc'
}

export class TechnologyDataSource implements SimpleDataSource<Technology> {
  private readonly data: Technology[];
  private readonly pageNumber = new BehaviorSubject<number>(0);
  private readonly sort: BehaviorSubject<Sort<Technology>>;
  private readonly criteriaBasedQuery: BehaviorSubject<CriteriaBasedQuery>;
  private readonly nameBasedQuery: BehaviorSubject<string>;

  public isPaginated = true;
  public totalInputSize: number;
  public currentIndex: number = 0;
  public pageNumber$ = this.pageNumber.asObservable();
  public filteredData$: Observable<Technology[]>;
  public paginatedData$: Observable<Technology[]>;

  constructor(data: Technology[], initialSort: Sort<Technology>, initialQuery: CriteriaBasedQuery, public pageSize = 5) {
    this.data = data;
    this.sort = new BehaviorSubject<Sort<Technology>>(initialSort);
    this.criteriaBasedQuery = new BehaviorSubject<CriteriaBasedQuery>(initialQuery);
    this.nameBasedQuery = new BehaviorSubject<string>(undefined);

    this.filteredData$ = combineLatest([this.criteriaBasedQuery, this.nameBasedQuery, this.sort]).pipe(
      switchMap(([criteriaQuery, nameQuery, sort]) => {
          let result = this.processData(this.data, criteriaQuery, nameQuery, sort);
          this.totalInputSize = result.length;
          return of(result);
        }
      ),
      shareReplay(1)
    );

    this.paginatedData$ = combineLatest([this.filteredData$, this.pageNumber$]).pipe(
      map(([data, pageNumber]) => {
        let startIndex = pageNumber * this.pageSize;
        let endIndex = startIndex + this.pageSize;
        if (endIndex > data.length) {
          endIndex = data.length;
        }
        return data.slice(startIndex, endIndex);
      })
    );
  }

  sortBy(sort: Partial<Sort<Technology>>): void {
    const lastSort = this.sort.getValue();
    const nextSort = {...lastSort, ...sort};
    this.sort.next(nextSort);
  }

  queryByCriteria(query: CriteriaBasedQuery): void {
    const lastQuery = this.criteriaBasedQuery.getValue();
    const nextQuery = {...lastQuery, ...query};
    console.log(nextQuery);
    this.criteriaBasedQuery.next(nextQuery);

  }

  queryByName(query: string): void {
    this.nameBasedQuery.next(query);
  }

  fetch(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber.next(event.pageIndex);
    this.currentIndex = event.pageIndex;
  }

  togglePagination(): void {
    this.isPaginated = !this.isPaginated;
  }

  connect(): Observable<Technology[]> {
    if (this.isPaginated) {
      return this.paginatedData$;
    }
    return this.filteredData$;
  }

  disconnect(): void {
  }

  private processData(data: Technology[], criteriaQuery: CriteriaBasedQuery, nameQuery: string, sort: Sort<Technology>): Technology[] {
    let result: Technology[] = data;
    if (nameQuery) {
      result = data.filter(platform => nameQuery ? platform.platformName.toLocaleLowerCase().includes(nameQuery) : true);
    }

    if (criteriaQuery) {

      Object.keys(criteriaQuery).forEach(key => {
        if (TechnologyDataSource.canFilter(criteriaQuery[key])) {
          result = result.filter(t => {
            let filteringResult = false;
            for (let c of t.dossier.reviewedCriteria) {
              if (c.criterionId === key) {
                for (let v of c.values) {
                  // TODO: split into separate methods
                  if (criteriaQuery[key].filterType === CriterionFilterType.lte) {
                    filteringResult = c.values[0].value <= criteriaQuery[key].value;
                  } else if (criteriaQuery[key].filterType === CriterionFilterType.bool) {


                    if (c.values.size > 0 && typeof c.values[0].value === 'boolean') {
                      filteringResult = c.values[0].value === criteriaQuery[key].value;
                    } else {
                      filteringResult = c.values.size > 0;
                    }



                  } else if (criteriaQuery[key].filterType === CriterionFilterType.containsOne) {
                    let chosenValues = criteriaQuery[key].value as string[];
                    if (chosenValues && chosenValues.length > 0) {
                      for (let entry of c.values) {
                        let value = entry.value as string;
                        if (chosenValues.indexOf(value) !== -1) {
                          filteringResult = true;
                          break;
                        }
                      }
                    } else {
                      filteringResult = true;
                    }
                  } else if (criteriaQuery[key].filterType === CriterionFilterType.containsAll) {
                    let allValues = [];
                    c.values.forEach(v => allValues.push(v.value));
                    filteringResult = JSON.stringify(allValues) === JSON.stringify(criteriaQuery[key].value);
                  }
                }
                break;
              }
            }
            return filteringResult;
          });
        }
      });

      console.log(result);
    }

    if (sort && sort.order === 'asc') {
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? 1 : -1);
    } else if (sort && sort.order === 'desc') {
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? -1 : 1);
    }

    return result;
  }

  private static canFilter(filterValue: CriterionFilterValue): boolean {
    if (filterValue.filterType === CriterionFilterType.lte) {
      let v = filterValue.value as number;
      return !isNaN(v);
    } else if (filterValue.filterType === CriterionFilterType.containsAll ||
      filterValue.filterType === CriterionFilterType.containsOne ||
      filterValue.filterType === CriterionFilterType.excludesAll) {
      let v = filterValue.value as string[];
      return v && v.length > 0;
    }
    return true;
  }
}
