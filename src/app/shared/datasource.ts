import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {PageEvent} from '@angular/material/paginator';
import {CriteriaBasedQuery, CriterionFilterType, CriterionFilterValue} from './interfaces/filtering';
import {Technology} from "./interfaces/technology";
import {CriterionValue} from "./interfaces/classification";

export interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;

  disconnect(): void;
}

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export class TechnologyDataSource implements SimpleDataSource<Technology> {
  public isPaginated = true;
  public totalInputSize: number = 0;
  public currentIndex = 0;
  public filteredData$: Observable<Technology[]>;
  public paginatedData$: Observable<Technology[]>;
  private readonly data: Technology[];
  private readonly pageNumber = new BehaviorSubject<number>(0);
  public pageNumber$ = this.pageNumber.asObservable();
  private readonly sort: BehaviorSubject<Sort<Technology>>;
  private readonly criteriaBasedQuery: BehaviorSubject<CriteriaBasedQuery>;
  private readonly nameBasedQuery: BehaviorSubject<string>;

  constructor(data: Technology[], initialSort: Sort<Technology>, initialQuery: CriteriaBasedQuery, public pageSize = 10) {
    this.data = data;
    this.sort = new BehaviorSubject<Sort<Technology>>(initialSort);
    this.criteriaBasedQuery = new BehaviorSubject<CriteriaBasedQuery>(initialQuery);
    this.nameBasedQuery = new BehaviorSubject<string>("");

    this.filteredData$ = combineLatest([this.criteriaBasedQuery, this.nameBasedQuery, this.sort]).pipe(
      switchMap(([criteriaQuery, nameQuery, sort]) => {
          const result = this.processData(this.data, criteriaQuery, nameQuery, sort);
          this.totalInputSize = result.length;
          return of(result);
        }
      ),
      shareReplay(1)
    );

    this.paginatedData$ = combineLatest([this.filteredData$, this.pageNumber$]).pipe(
      map(([data, pageNumber]) => {
        const startIndex = pageNumber * this.pageSize;
        let endIndex = startIndex + this.pageSize;
        if (endIndex > data.length) {
          endIndex = data.length;
        }
        return data.slice(startIndex, endIndex);
      })
    );
  }

  private static canFilter(filterValue: CriterionFilterValue): boolean {
    if (filterValue.filterType && filterValue.filterType === CriterionFilterType.lte) {
      return typeof filterValue.value === 'number';
    } else if (filterValue.filterType && filterValue.filterType === CriterionFilterType.containsAll ||
      filterValue.filterType === CriterionFilterType.containsOne ||
      filterValue.filterType === CriterionFilterType.excludesAll) {
      const v = filterValue.value as string[];
      return v && v.length > 0;
    } else if (filterValue.filterType === CriterionFilterType.bool || filterValue.filterType === CriterionFilterType.containsAny) {
      return typeof filterValue.value === 'boolean';
    }

    return false;
  }

  private static containsAny(filterValue: CriterionFilterValue, values: CriterionValue[]): boolean {
    const chosenValue = filterValue.value as boolean;
    if (chosenValue) {
      return values.length > 0;
    } else {
      return values.length === 0;
    }
  }

  private static containsOne(filterValue: CriterionFilterValue, values: CriterionValue[]): boolean {
    const chosenValues = filterValue.value as string[];
    if (chosenValues && chosenValues.length > 0) {
      for (const entry of values) {
        const value = entry.value as string;
        if (chosenValues.indexOf(value) !== -1) {
          return true;
        }
      }
    }
    return false;
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
    /*if (nameQuery) {
      result = data.filter(dossier => nameQuery ? dossier.technologyName.toLocaleLowerCase().includes(nameQuery) : true);
    }*/

    if (criteriaQuery && Object.keys(criteriaQuery).length !== 0) {
      Object.keys(criteriaQuery).forEach((key) => {
        if (TechnologyDataSource.canFilter(criteriaQuery[key])) {
          result = result.filter((technology) => {
            let filteringResult = false;
            let values: CriterionValue[] | undefined = technology.dossier!.reviewedCriteria.get(key);

            if (values) {
              filteringResult = this.getFilteringResult(criteriaQuery[key], values);
            }
            return filteringResult;
          });
        }
      });
      console.log('found: ' + result.length);
    }

    if (sort && sort.order === 'asc') {
      // @ts-ignore
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? 1 : -1);
    } else if (sort && sort.order === 'desc') {
      // @ts-ignore
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? -1 : 1);
    }

    return result;
  }

  private pruneQuery(nextQuery: { [p: string]: CriterionFilterValue }) {
    const keysToDelete: any[] = [];
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
          const valueToCheck = nextQuery[key].value as string[];
          if (valueToCheck.length === 0) {
            keysToDelete.push(key);
          }
        }
      }
    );
    keysToDelete.forEach(key => delete nextQuery[key]);
  }

  private getFilteringResult(filterValue: CriterionFilterValue, values: CriterionValue[]): boolean {
    if (filterValue.filterType === CriterionFilterType.containsAny) {
      return TechnologyDataSource.containsAny(filterValue, values);
    }

    for (const reviewValue of values) {
      if (filterValue.filterType === CriterionFilterType.lte) {
        return values[0].value <= filterValue.value;
      } else if (filterValue.filterType === CriterionFilterType.bool) {
        if (filterValue.value !== null) {
          return values[0]?.value === filterValue.value;
        }
      } else if (filterValue.filterType === CriterionFilterType.containsOne) {
        return TechnologyDataSource.containsOne(filterValue, values);
      } else {
        const allValues: any[] = [];
        values.forEach(v => allValues.push(v.value));
        const target = Array.from(filterValue.value as string[]);

        if (filterValue.filterType === CriterionFilterType.containsAll) {
          return target.every(v => allValues.includes(v));
        } else if (filterValue.filterType === CriterionFilterType.excludesAll) {
          return target.every(v => !allValues.includes(v));
        }
      }
    }

    return false;
  }
}
