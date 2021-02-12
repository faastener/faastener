import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Versioning {
  appVersions: CriterionValueModel;
  funcVersions: CriterionValueModel;

  constructor(appVersions: CriterionValueModel, funcVersions: CriterionValueModel) {
    this.appVersions = appVersions;
    this.funcVersions = funcVersions;
  }
}
