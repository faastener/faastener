import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {Technology} from './interfaces/technology';
import {PageEvent} from '@angular/material/paginator';
import {CriteriaBasedQuery, CriterionFilterType, CriterionFilterValue} from './interfaces/filtering';
import {CriterionInstance} from './interfaces/classification';

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

  constructor(data: Technology[], initialSort: Sort<Technology>, initialQuery: CriteriaBasedQuery, public pageSize = 10) {
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
    console.log('new query:');
    this.pruneQuery(nextQuery);
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

    if (criteriaQuery && Object.keys(criteriaQuery).length !== 0) {
      Object.keys(criteriaQuery).forEach(key => {
        if (TechnologyDataSource.canFilter(criteriaQuery[key])) {
          result = result.filter(t => {
            let filteringResult = false;
            if (t.dossier.reviewedCriteria.has(key)) {
              filteringResult = this.getFilteringResult(criteriaQuery[key], t.dossier.reviewedCriteria.get(key));
            }
            return filteringResult;
          });
        }
      });
      console.log('found: ' + result.length);
    }

    if (sort && sort.order === 'asc') {
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? 1 : -1);
    } else if (sort && sort.order === 'desc') {
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? -1 : 1);
    }

    return result;
  }

  private static canFilter(filterValue: CriterionFilterValue): boolean {
    if (filterValue.filterType && filterValue.filterType === CriterionFilterType.lte) {
      return typeof filterValue.value === 'number';
    } else if (filterValue.filterType && filterValue.filterType === CriterionFilterType.containsAll ||
      filterValue.filterType === CriterionFilterType.containsOne ||
      filterValue.filterType === CriterionFilterType.excludesAll) {
      let v = filterValue.value as string[];
      return v && v.length > 0;
    } else if (filterValue.filterType === CriterionFilterType.bool || filterValue.filterType === CriterionFilterType.containsAny) {
      return typeof filterValue.value === 'boolean';
    }

    return false;
  }

  private pruneQuery(nextQuery: { [p: string]: CriterionFilterValue }) {
    let keysToDelete = [];
    Object.keys(nextQuery).forEach(key => {
        if (nextQuery[key].filterType === null) {
          keysToDelete.push(key);
        } else if (nextQuery[key].filterType === CriterionFilterType.bool ||
          nextQuery[key].filterType === CriterionFilterType.containsAny ||
          nextQuery[key].filterType === CriterionFilterType.lte) {
          if (nextQuery[key].value === null) {
            keysToDelete.push(key);
          }
        } else if (nextQuery[key].filterType === CriterionFilterType.containsOne ||
          nextQuery[key].filterType === CriterionFilterType.containsAll ||
          nextQuery[key].filterType === CriterionFilterType.excludesAll) {
          let valueToCheck = nextQuery[key].value as string[];
          if (valueToCheck.length === 0) {
            keysToDelete.push(key);
          }
        }
      }
    );
    keysToDelete.forEach(key => delete nextQuery[key]);
  }

  private getFilteringResult(filterValue: CriterionFilterValue, reviewedCriterion: CriterionInstance): boolean {
    if (filterValue.filterType === CriterionFilterType.containsAny) {
      return TechnologyDataSource.containsAny(filterValue, reviewedCriterion);
    }

    for (let reviewValue of reviewedCriterion.values) {
      if (filterValue.filterType === CriterionFilterType.lte) {
        return reviewedCriterion.values[0].value <= filterValue.value;
      } else if (filterValue.filterType === CriterionFilterType.bool) {
        if (filterValue.value !== null) {
          return reviewedCriterion.values[0]?.value === filterValue.value;
        }
      } else if (filterValue.filterType === CriterionFilterType.containsOne) {
        return TechnologyDataSource.containsOne(filterValue, reviewedCriterion);
      } else {
        let allValues = [];
        reviewedCriterion.values.forEach(v => allValues.push(v.value));
        let target = Array.from(filterValue.value as string[]);

        if (filterValue.filterType === CriterionFilterType.containsAll) {
          return target.every(v => allValues.includes(v));
        } else if (filterValue.filterType === CriterionFilterType.excludesAll) {
          return target.every(v => !allValues.includes(v));
        }
      }
    }
  }

  private static containsAny(filterValue: CriterionFilterValue, reviewedCriterion: CriterionInstance): boolean {
    let chosenValue = filterValue.value as boolean;
    if (chosenValue) {
      return Array.from(reviewedCriterion.values).length > 0;
    } else {
      return Array.from(reviewedCriterion.values).length === 0;
    }
  }

  private static containsOne(filterValue: CriterionFilterValue, reviewedCriterion: CriterionInstance): boolean {
    let chosenValues = filterValue.value as string[];
    if (chosenValues && chosenValues.length > 0) {
      for (let entry of reviewedCriterion.values) {
        let value = entry.value as string;
        if (chosenValues.indexOf(value) !== -1) {
          return true;
        }
      }
    }
  }
}
