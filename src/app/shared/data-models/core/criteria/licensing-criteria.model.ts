import {CriterionModel} from '../../classification/criterion.model';

export class LicensingCriteria {
  license: CriterionModel;
  licenseType: CriterionModel;

  getLicense() {
    return this.license;
  }

  getLicenseType() {
    return this.licenseType;
  }
}
