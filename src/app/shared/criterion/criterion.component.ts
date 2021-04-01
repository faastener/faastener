import {Component, Input, OnInit} from '@angular/core';
import {ClassificationCriterion, CriterionInstance} from '../interfaces/classification';

@Component({
  selector: 'app-criterion',
  templateUrl: './criterion.component.html',
  styleUrls: ['./criterion.component.scss']
})
export class CriterionComponent implements OnInit {
  @Input('criterion') criterion: ClassificationCriterion;
  @Input('extraTitleText') extraTitleText: string;
  @Input('criterionInstance') criterionInstance: CriterionInstance;
  @Input('icon') icon: string = 'text_snippet';
  title: string;

  constructor() {
  }

  ngOnInit(): void {
    this.extraTitleText ? this.title = this.extraTitleText + this.criterion.name : this.title = this.criterion.name;
  }

}
