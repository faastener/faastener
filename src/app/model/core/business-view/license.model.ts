import {Value} from '../../shared/value.model';

export class License {
  license: Value;
  type: string;

  constructor(license: Value, type: string) {
    this.license = license;
    this.type = type;
  }
}
