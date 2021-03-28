import {Component, Input, OnInit} from '@angular/core';
import {CriterionFilterConfiguration} from '../../shared/interfaces/filtering';

@Component({
  selector: 'app-criterion-filter',
  templateUrl: './criterion-filter.component.html',
  styleUrls: ['./criterion-filter.component.scss']
})
export class CriterionFilterComponent implements OnInit {
  @Input() filter: CriterionFilterConfiguration;

  constructor() {
  }

  ngOnInit(): void {
  }

}
