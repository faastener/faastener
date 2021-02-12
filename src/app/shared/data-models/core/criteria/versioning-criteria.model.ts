import {CriterionModel} from '../../classification/criterion.model';

export class VersioningCriteria {
  applicationVersion: CriterionModel;
  functionVersion: CriterionModel;

  getApplicationVersion() {
    return this.applicationVersion;
  }

  getFunctionVersion() {
    return this.functionVersion;
  }
}
