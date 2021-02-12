import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Documentation {
  functions: CriterionValueModel[];
  platform: CriterionValueModel[];

  constructor(functions: CriterionValueModel[], platform: CriterionValueModel[]) {
    this.functions = functions;
    this.platform = platform;
  }
}
