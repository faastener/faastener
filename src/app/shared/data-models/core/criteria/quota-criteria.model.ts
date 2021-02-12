import {CriterionModel} from '../../classification/criterion.model';

export class QuotaCriteria {
  packageSize: CriterionModel;
  execTime: CriterionModel;

  getPackageSize() {
    return this.packageSize;
  }

  getExecTime() {
    return this.execTime;
  }
}
