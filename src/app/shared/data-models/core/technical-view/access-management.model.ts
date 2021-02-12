import {CriterionValueModel} from '../../classification/criterion-value.model';

export class AccessManagement {
  auth: CriterionValueModel[];
  accessControl: CriterionValueModel[];

  constructor(auth: CriterionValueModel[], accessControl: CriterionValueModel[]) {
    this.auth = auth;
    this.accessControl = accessControl;
  }
}
