import {Criterion} from '../../shared/criterion.model';

export class OrchestrationCriteria {
  orchestrationSupport: Criterion;
  orchestrationType: Criterion;

  constructor() {
    this.orchestrationSupport = new Criterion('Function orchestration support');
    this.orchestrationType = new Criterion('Function orchestration type');
  }

  getOrchestrationSupport() {
    return this.orchestrationSupport;
  }

  getOrchestrationType() {
    return this.orchestrationType;
  }
}
