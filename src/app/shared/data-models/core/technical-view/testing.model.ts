import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Testing {
  functional: CriterionValueModel[];
  nonFunctional: CriterionValueModel[];

  constructor(functional: CriterionValueModel[], nonFunctional: CriterionValueModel[]) {
    this.functional = functional;
    this.nonFunctional = nonFunctional;
  }
}
