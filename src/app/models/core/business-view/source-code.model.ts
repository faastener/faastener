import {Value} from '../../shared/value.model';

export class SourceCode {
  availability: Value;
  hostingPlatform: Value;
  prgLang: Value;

  constructor(availability: Value, hostingPlatform: Value, prgLang: Value) {
    this.availability = availability;
    this.hostingPlatform = hostingPlatform;
    this.prgLang = prgLang;
  }
}
