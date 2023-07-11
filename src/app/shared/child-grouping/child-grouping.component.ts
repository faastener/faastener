import {Component, Input} from '@angular/core';
import {CriteriaGrouping, CriterionInstance} from '../interfaces/classification';

@Component({
  selector: 'app-child-grouping',
  templateUrl: './child-grouping.component.html',
  styleUrls: ['./child-grouping.component.scss']
})
export class ChildGroupingComponent {
  @Input() groupings: CriteriaGrouping[];
  @Input() subGroups = false;
  @Input() parent = '';
  @Input() extraCriterionTitle: string;
  @Input() renderReviewData = false;
  @Input() reviewData: Set<CriterionInstance>;

  constructor() {
  }

  findCriterionInstance(id: string): CriterionInstance {
    this.reviewData.forEach(item => {
      if (item.typeId === id) return item;
    });
    return null;
  }
}
