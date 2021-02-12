import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Interfaces {
  type: CriterionValueModel[];
  appManagement: CriterionValueModel[];
  platformAdministration: CriterionValueModel[];

  constructor(type: CriterionValueModel[], appManagement: CriterionValueModel[], platformAdministration: CriterionValueModel[]) {
    this.type = type;
    this.appManagement = appManagement;
    this.platformAdministration = platformAdministration;
  }
}
