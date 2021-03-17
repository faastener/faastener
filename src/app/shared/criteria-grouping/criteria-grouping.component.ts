import {Component, Input} from '@angular/core';
import {CriteriaGrouping} from '../interfaces/classification';

@Component({
  selector: 'app-criteria-grouping',
  templateUrl: './criteria-grouping.component.html',
  styleUrls: ['./criteria-grouping.component.scss']
})
export class CriteriaGroupingComponent {
  @Input('data') groupings: Set<CriteriaGrouping>;

  constructor() {
  }
}
