import {Quotas} from '../business-view/quotas.model';
import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Development {
  funcRuntimes: CriterionValueModel[];
  runtimeCustomization: CriterionValueModel;
  editors: CriterionValueModel[];
  clientLibs: CriterionValueModel[];
  quotas: Quotas;

  constructor(funcRuntimes: CriterionValueModel[],
              runtimeCustomization: CriterionValueModel,
              editors: CriterionValueModel[],
              clientLibs: CriterionValueModel[],
              quotas: Quotas) {
    this.funcRuntimes = funcRuntimes;
    this.runtimeCustomization = runtimeCustomization;
    this.editors = editors;
    this.clientLibs = clientLibs;
    this.quotas = quotas;
  }
}
