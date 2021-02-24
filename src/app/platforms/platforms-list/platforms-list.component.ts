import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {FilteringService} from '../../core/services/filtering.service';
import {FaasPlatform} from '../../shared/interfaces/faas-platform';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.scss']
})
export class PlatformsListComponent {
  @Input() supportedPlatforms$: Observable<FaasPlatform[]>;

  constructor(private filteringService: FilteringService) {
  }

  onFilterChange(filter: any) {
    this.filteringService.addNameFilter(filter.target.value);
  }
}
