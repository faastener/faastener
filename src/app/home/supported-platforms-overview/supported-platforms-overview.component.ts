import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {FaasPlatformModel} from '../../shared/data-models/faas-platform/faas-platform.model';

@Component({
  selector: 'app-home-platforms-overview',
  templateUrl: './supported-platforms-overview.component.html',
  styleUrls: ['./supported-platforms-overview.component.scss']
})
export class SupportedPlatformsOverviewComponent {
  @Input() supportedPlatforms$: Observable<FaasPlatformModel[]>;

  constructor() {
  }
}
