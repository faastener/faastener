import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';
import {Technology} from './interfaces/technology';
import {FilterBasedQuery} from './interfaces/filtering';
import {PageEvent} from '@angular/material/paginator';

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
  private readonly criteriaBasedQuery: BehaviorSubject<FilterBasedQuery>;
  private readonly nameBasedQuery: BehaviorSubject<string>;

  public totalInputSize: number;
  public currentIndex: number = 0;
  public pageNumber$ = this.pageNumber.asObservable();
  public filteredData$: Observable<Technology[]>;
  public paginatedData$: Observable<Technology[]>;

  constructor(data: Technology[], initialSort: Sort<Technology>, initialQuery: FilterBasedQuery, public pageSize = 5) {
    this.data = data;
    this.sort = new BehaviorSubject<Sort<Technology>>(initialSort);
    this.criteriaBasedQuery = new BehaviorSubject<FilterBasedQuery>(initialQuery);
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

  queryByCriteria(query: Partial<FilterBasedQuery>): void {
    const lastQuery = this.criteriaBasedQuery.getValue();
    const nextQuery = {...lastQuery, ...query};
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

  connect(): Observable<Technology[]> {
    return this.paginatedData$;
  }

  disconnect(): void {
  }

  private processData(data: Technology[], criteriaQuery: FilterBasedQuery, nameQuery: string, sort: Sort<Technology>): Technology[] {
    let result: Technology[] = data;
    if (nameQuery) {
      result = data.filter(platform => nameQuery ? platform.platformName.toLocaleLowerCase().includes(nameQuery) : true);
    }

    if (criteriaQuery) {

    }

    if (sort && sort.order === 'asc') {
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? 1 : -1);
    } else if (sort && sort.order === 'desc') {
      result = result.sort((a, b) => a[sort.property] > b[sort.property] ? -1 : 1);
    }

    return result;
  }
}
