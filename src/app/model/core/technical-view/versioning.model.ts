import {Value} from '../../shared/value.model';

export class Versioning {
  appVersions: Value;
  funcVersions: Value;

  constructor(appVersions: Value, funcVersions: Value) {
    this.appVersions = appVersions;
    this.funcVersions = funcVersions;
  }
}
