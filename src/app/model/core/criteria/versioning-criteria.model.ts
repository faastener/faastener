import {Criterion} from '../../shared/criterion.model';

export class VersioningCriteria {
  applicationVersion: Criterion;
  functionVersion: Criterion;

  constructor() {
    this.applicationVersion = new Criterion('Application versions');
    this.functionVersion = new Criterion('Function versions');
  }

  getApplicationVersion() {
    return this.applicationVersion;
  }

  getFunctionVersion() {
    return this.functionVersion;
  }
}
