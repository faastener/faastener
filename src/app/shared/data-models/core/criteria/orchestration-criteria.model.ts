import {CriterionModel} from '../../classification/criterion.model';

export class OrchestrationCriteria {
  orchestrationSupport: CriterionModel;
  orchestrationType: CriterionModel;

  getOrchestrationSupport() {
    return this.orchestrationSupport;
  }

  getOrchestrationType() {
    return this.orchestrationType;
  }
}
