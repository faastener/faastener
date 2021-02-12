import {CriterionValueModel} from '../../classification/criterion-value.model';

export class License {
  license: CriterionValueModel;
  type: string;

  constructor(license: CriterionValueModel, type: string) {
    this.license = license;
    this.type = type;
  }
}
