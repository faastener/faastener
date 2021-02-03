import {Criterion} from '../../shared/criterion.model';

export class LicensingCriteria {
  license: Criterion;
  licenseType: Criterion;

  constructor() {
    this.license = new Criterion('License');
    this.licenseType = new Criterion('License type');
  }

  getLicense() {
    return this.license;
  }

  getLicenseType() {
    return this.licenseType;
  }
}
