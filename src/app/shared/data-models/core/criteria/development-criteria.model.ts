import {CriterionModel} from '../../classification/criterion.model';

export class DevelopmentCriteria {
  runtimes: CriterionModel;
  runtimeCustomization: CriterionModel;
  editors: CriterionModel;
  clientLibs: CriterionModel;

  getRuntimes() {
    return this.runtimes;
  }

  getRuntimeCustomization() {
    return this.runtimeCustomization;
  }

  getEditors() {
    return this.editors;
  }

  getClientLibs() {
    return this.clientLibs;
  }
}
