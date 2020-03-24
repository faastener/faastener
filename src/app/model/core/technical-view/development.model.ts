import {Value} from '../../shared/value.model';

export class Development {
  funcRuntimes: Value[];
  runtimeCustomization: Value;
  editors: Value[];
  clientLibs: Value[];

  constructor(funcRuntimes: Value[],
              runtimeCustomization: Value,
              editors: Value[],
              clientLibs: Value[]) {
    this.funcRuntimes = funcRuntimes;
    this.runtimeCustomization = runtimeCustomization;
    this.editors = editors;
    this.clientLibs = clientLibs;
  }
}
