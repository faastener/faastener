import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {FaasPlatform} from '../../shared/interfaces/faas-platform';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() supportedPlatforms$: Observable<FaasPlatform[]>;

  constructor() {
  }
}
