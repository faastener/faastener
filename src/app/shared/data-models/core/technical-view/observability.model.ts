import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Observability {
  logging: CriterionValueModel[];
  monitoring: CriterionValueModel[];
  integration: CriterionValueModel[];

  constructor(logging: CriterionValueModel[], monitoring: CriterionValueModel[], integration: CriterionValueModel[]) {
    this.logging = logging;
    this.monitoring = monitoring;
    this.integration = integration;
  }
}
