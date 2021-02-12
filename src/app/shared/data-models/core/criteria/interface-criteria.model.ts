import {CriterionModel} from '../../classification/criterion.model';

export class InterfaceCriteria {
  interfaceTypes: CriterionModel;
  appInterfaces: CriterionModel;
  platformInterfaces: CriterionModel;

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
