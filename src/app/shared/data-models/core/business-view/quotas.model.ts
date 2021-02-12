import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Quotas {
  packageSize: CriterionValueModel;
  executionTime: CriterionValueModel;

  constructor(packageSize: CriterionValueModel, executionTime: CriterionValueModel) {
    this.packageSize = packageSize;
    this.executionTime = executionTime;
  }
}
