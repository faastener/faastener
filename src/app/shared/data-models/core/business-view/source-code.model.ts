import {CriterionValueModel} from '../../classification/criterion-value.model';

export class SourceCode {
  availability: CriterionValueModel;
  hostingPlatform: CriterionValueModel;
  prgLang: CriterionValueModel;

  constructor(availability: CriterionValueModel, hostingPlatform: CriterionValueModel, prgLang: CriterionValueModel) {
    this.availability = availability;
    this.hostingPlatform = hostingPlatform;
    this.prgLang = prgLang;
  }
}
