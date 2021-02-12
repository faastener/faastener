import {CriterionValueModel} from '../../classification/criterion-value.model';

export class AppDelivery {
  depAuto: CriterionValueModel[];
  ciCd: CriterionValueModel[];

  constructor(depAuto: CriterionValueModel[], ciCd: CriterionValueModel[]) {
    this.depAuto = depAuto;
    this.ciCd = ciCd;
  }
}
