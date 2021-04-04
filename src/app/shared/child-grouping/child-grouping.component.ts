import {Component, Input} from '@angular/core';
import {CriteriaGrouping, CriterionInstance} from '../interfaces/classification';

@Component({
  selector: 'app-child-grouping',
  templateUrl: './child-grouping.component.html',
  styleUrls: ['./child-grouping.component.scss']
})
export class ChildGroupingComponent {
  @Input() groupings: CriteriaGrouping[];
  @Input() subGroups: boolean = false;
  @Input() parent: string = '';
  @Input() extraCriterionTitle: string;
  @Input() renderReviewData = false;
  @Input() reviewData: Map<string, CriterionInstance>;

  constructor() {
  }
}
