import {Component, Input, OnInit} from '@angular/core';
import {ClassificationCriterion, CriterionInstance} from '../interfaces/classification';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit {
  @Input('criterion') criterion: ClassificationCriterion;
  @Input('criterionInstance') criterionInstance: CriterionInstance;

  constructor() {
  }

  ngOnInit(): void {
  }

}
