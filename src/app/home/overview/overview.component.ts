import {Component, Input} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Technology} from '../../shared/interfaces/technology';

@Component({
  selector: 'faastener-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent {
  @Input() technologies$: Observable<Technology[]> = EMPTY;

  constructor() {
  }
}
