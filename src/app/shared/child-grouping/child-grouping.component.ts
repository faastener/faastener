import {Component, Input} from '@angular/core';
import {CriteriaGrouping} from '../interfaces/classification';
import {NestedTreeControl} from '@angular/cdk/tree';

@Component({
  selector: 'app-child-grouping',
  templateUrl: './child-grouping.component.html',
  styleUrls: ['./child-grouping.component.scss']
})
export class ChildGroupingComponent {
  @Input('groupings') groupings: CriteriaGrouping[];
  @Input('subGroups') subGroups: boolean = false;
  @Input('parent') parent: string = '';
  treeControl = new NestedTreeControl<CriteriaGrouping>(node => Array.from(node.groupings));

  constructor() {
  }
}