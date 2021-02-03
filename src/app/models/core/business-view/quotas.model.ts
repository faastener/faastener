import {Value} from '../../shared/value.model';

export class Quotas {
  packageSize: Value;
  executionTime: Value;

  constructor(packageSize: Value, executionTime: Value) {
    this.packageSize = packageSize;
    this.executionTime = executionTime;
  }
}
