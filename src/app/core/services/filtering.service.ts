import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilteringService {

  private filterByNameSubject = new BehaviorSubject<string>('');
  filteredNameAction$ = this.filterByNameSubject.asObservable();


  constructor() {
  }

  addNameFilter(filter: string) {
    this.filterByNameSubject.next(filter);
  }
}
