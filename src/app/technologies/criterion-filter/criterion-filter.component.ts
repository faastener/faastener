import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriteriaBasedQuery, CriterionFilterConfiguration, CriterionFilterType} from '../../shared/interfaces/filtering';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
  selector: 'app-criterion-filter',
  templateUrl: './criterion-filter.component.html',
  styleUrls: ['./criterion-filter.component.scss']
})
export class CriterionFilterComponent implements OnInit {
  @Input() filter: CriterionFilterConfiguration;
  @Output() updateQuery = new EventEmitter<CriteriaBasedQuery>();

  filterElement!: UntypedFormControl | UntypedFormGroup;
  public FilterType = CriterionFilterType;

  constructor(private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    if (this.filter.filterType === this.FilterType.bool || this.filter.filterType === this.FilterType.containsAny || this.filter.filterType === this.FilterType.lte) {
      this.filterElement = this.fb.control(null);
    } else {
      const controls = this.fb.array([]);
      this.filter.filterValues.forEach(v => controls.push(this.fb.control(false)));
      this.filterElement = this.fb.group({
        checkboxes: controls,
        filterType: this.fb.control(this.filter.filterType)
      });
    }

    this.filterElement.valueChanges.subscribe(value => {
      const obj = {};
      if (this.filter.filterType === this.FilterType.bool || this.filter.filterType === this.FilterType.containsAny) {
        obj[this.filter.criterionTypeId] = {
          filterType: this.filter.filterType,
          value: value as boolean
        };
      } else if (this.filter.filterType === this.FilterType.lte) {
        obj[this.filter.criterionTypeId] = {
          filterType: this.filter.filterType,
          value: value as number
        };
      } else {
        const initialValues = this.filter.filterValues as string[];
        const selectedStrings = initialValues.filter((x, i) => !!this.filterElement.value.checkboxes[i]);

        obj[this.filter.criterionTypeId] = {
          filterType: this.filterElement.value.filterType,
          value: selectedStrings
        };
        if (selectedStrings.length === 0) {
          this.filterElement.markAsPristine();
        }
      }

      this.updateQuery.emit(obj);
    });


    function isArrayOfStrings(value: any): boolean {
      return Array.isArray(value) && value.every(item => typeof item === 'string');
    }

  }

  clearFilter() {
    this.filterElement.reset();
    if (
      this.filter.filterType === this.FilterType.containsAll ||
      this.filter.filterType === this.FilterType.containsOne ||
      this.filter.filterType === this.FilterType.excludesAll
    ) {
      this.filterElement.get('filterType').setValue(this.FilterType.containsOne);
    }
    this.filterElement.markAsPristine();
  }
}
