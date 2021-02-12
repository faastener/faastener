import {CriterionModel} from '../../classification/criterion.model';

export class CodeCriteria {
  availability: CriterionModel;
  hostingPlatform: CriterionModel;
  mainLanguage: CriterionModel;

  getAvailability() {
    return this.availability;
  }

  getHostingPlatform() {
    return this.hostingPlatform;
  }

  getMainLanguage() {
    return this.mainLanguage;
  }
}
