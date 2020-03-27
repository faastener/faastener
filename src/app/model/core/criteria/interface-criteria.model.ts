import {Criterion} from '../../shared/criterion.model';

export class InterfaceCriteria {
  interfaceTypes: Criterion;
  appInterfaces: Criterion;
  platformInterfaces: Criterion;

  constructor() {
    this.interfaceTypes = new Criterion('Interface types');
    this.appInterfaces = new Criterion('Application management interface operations');
    this.platformInterfaces = new Criterion('Platform administration interface operations');
  }

  getInterfaceTypes() {
    return this.interfaceTypes;
  }

  getAppInterfaces() {
    return this.appInterfaces;
  }

  getPlatformInterfaces() {
    return this.platformInterfaces;
  }
}
