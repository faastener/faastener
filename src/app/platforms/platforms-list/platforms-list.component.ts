import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {FaasPlatformModel} from '../../shared/data-models/faas-platform/faas-platform.model';
import {FilteringService} from '../../core/services/filtering.service';

@Component({
  selector: 'app-platforms-list',
  templateUrl: './platforms-list.component.html',
  styleUrls: ['./platforms-list.component.scss']
})
export class PlatformsListComponent {
  @Input() supportedPlatforms$: Observable<FaasPlatformModel[]>;

  constructor(private filteringService: FilteringService) {
  }

  onFilterChange(filter: any) {
    this.filteringService.addNameFilter(filter.target.value);
  }
}
