import {Criterion} from '../../shared/criterion.model';

export class CodeCriteria {
  availability: Criterion;
  hostingPlatform: Criterion;
  mainLanguage: Criterion;

  constructor() {
    this.availability = new Criterion('Source code availability');
    this.hostingPlatform = new Criterion('Code hosting platform');
    this.mainLanguage = new Criterion('Main programming language');
  }

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
