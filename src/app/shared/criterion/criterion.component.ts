import {Component, Input, OnInit} from '@angular/core';
import {ClassificationCriterion, CriterionValue} from '../interfaces/classification';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit {
  @Input() criterion!: ClassificationCriterion;
  @Input() extraTitleText: string = '';
  @Input() criterionValues: CriterionValue[] | undefined;
  @Input() reviewMode!: boolean;
  @Input() icon = 'text_snippet';
  title: string = '';

  constructor() {
  }

  ngOnInit(): void {
    if (this.extraTitleText) {
      this.title = this.extraTitleText + this.criterion.name;
    } else {
      this.title = this.criterion.name;
    }
  }
}
