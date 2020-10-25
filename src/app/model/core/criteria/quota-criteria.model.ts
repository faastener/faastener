import {Criterion} from '../../shared/criterion.model';

export class QuotaCriteria {
  packageSize: Criterion;
  execTime: Criterion;

  constructor() {
    this.packageSize = new Criterion('Deployment Quota: Package Size');
    this.execTime = new Criterion('Runtime Quota: Execution Time');
  }

  getPackageSize() {
    return this.packageSize;
  }

  getExecTime() {
    return this.execTime;
  }
}
