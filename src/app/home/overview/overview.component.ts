import {Component, Input} from '@angular/core';
import {Observable} from 'rxjs';
import {Technology} from '../../shared/interfaces/technology';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() supportedPlatforms$: Observable<Technology[]>;

  constructor() {
  }
}
