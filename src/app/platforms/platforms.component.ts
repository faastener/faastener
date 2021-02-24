import {Component} from '@angular/core';
import {DataService} from '../core/services/data.service';
import {combineLatest, Observable} from 'rxjs';
import {FilteringService} from '../core/services/filtering.service';
import {map} from 'rxjs/operators';
import {FaasPlatform} from '../shared/interfaces/faas-platform';

@Component({
  selector: 'app-platforms',
  templateUrl: './platforms.component.html',
  styleUrls: ['./platforms.component.scss']
})
export class PlatformsComponent {

  constructor(private dataService: DataService, private filteringService: FilteringService) {
  }

  private supportedPlatforms$: Observable<FaasPlatform[]> = this.dataService.getPlatforms();

  filteredPlatforms$ = combineLatest([
    this.supportedPlatforms$,
    this.filteringService.filteredNameAction$
  ]).pipe(
    map(([platforms, filterString]) => {
      return platforms.filter(
        platform => filterString ?
          platform.platformName.toLocaleLowerCase().includes(filterString) : true
      );
    })
  );


}
