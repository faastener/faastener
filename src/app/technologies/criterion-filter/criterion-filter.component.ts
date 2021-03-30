import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriteriaBasedQuery, CriterionFilterConfiguration, CriterionFilterType} from '../../shared/interfaces/filtering';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-criterion-filter',
  templateUrl: './criterion-filter.component.html',
  styleUrls: ['./criterion-filter.component.scss']
})
export class CriterionFilterComponent implements OnInit {
  @Input() filter: CriterionFilterConfiguration;
  @Output() updateQuery = new EventEmitter<CriteriaBasedQuery>();

  filterElement: FormControl | FormGroup;

  public FilterType = CriterionFilterType;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.filter.filterType === this.FilterType.bool ||
      this.filter.filterType === this.FilterType.containsAny ||
      this.filter.filterType === this.FilterType.lte) {
      this.filterElement = this.fb.control(false);
    } else {
      let controls = this.fb.array([]);
      this.filter.filterValues.forEach(v => controls.push(this.fb.control(false)));
      this.filterElement = this.fb.group({
        checkboxes: controls
      });
    }

    this.filterElement.valueChanges.subscribe(value => {
      let obj = {};
      if (this.filter.filterType === this.FilterType.bool || this.filter.filterType === this.FilterType.containsAny || this.filter.filterType === this.FilterType.lte) {
        obj[this.filter.criterionId] = {
          filterType: this.filter.filterType,
          value: value
        };
      } else {
        let initialValues = this.filter.filterValues as string[];
        let selectedStrings = initialValues.filter((x, i) => !!this.filterElement.value.checkboxes[i]);

        obj[this.filter.criterionId] = {
          filterType: this.filter.filterType,
          value: selectedStrings
        };
      }

      console.log(obj);

      this.updateQuery.emit(obj);
    });


    function isArrayOfStrings(value: any): boolean {
      return Array.isArray(value) && value.every(item => typeof item === 'string');
    }

  }
}
