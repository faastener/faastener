import {Value} from '../../shared/value.model';
import {Quotas} from '../business-view/quotas.model';

export class Development {
  funcRuntimes: Value[];
  runtimeCustomization: Value;
  editors: Value[];
  clientLibs: Value[];
  quotas: Quotas;

  constructor(funcRuntimes: Value[],
              runtimeCustomization: Value,
              editors: Value[],
              clientLibs: Value[],
              quotas: Quotas) {
    this.funcRuntimes = funcRuntimes;
    this.runtimeCustomization = runtimeCustomization;
    this.editors = editors;
    this.clientLibs = clientLibs;
    this.quotas = quotas;
  }
}
