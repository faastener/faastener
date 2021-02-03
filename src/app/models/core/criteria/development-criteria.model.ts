import {Criterion} from '../../shared/criterion.model';

export class DevelopmentCriteria {
  runtimes: Criterion;
  runtimeCustomization: Criterion;
  editors: Criterion;
  clientLibs: Criterion;

  constructor() {
    this.runtimes = new Criterion('Function runtimes');
    this.runtimeCustomization = new Criterion('Runtime customization');
    this.editors = new Criterion('Editors');
    this.clientLibs = new Criterion('Client libraries');
  }

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
