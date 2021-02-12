import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Debugging {
  local: CriterionValueModel[];
  remote: CriterionValueModel[];

  constructor(local: CriterionValueModel[], remote: CriterionValueModel[]) {
    this.local = local;
    this.remote = remote;
  }
}
