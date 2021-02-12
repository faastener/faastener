import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Installation {
  type: CriterionValueModel;
  targetHosts: CriterionValueModel[];

  constructor(type: CriterionValueModel, targetHosts: CriterionValueModel[]) {
    this.type = type;
    this.targetHosts = targetHosts;
  }
}
