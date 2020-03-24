import {Value} from '../../shared/value.model';

export class Observability {
  logging: Value[];
  monitoring: Value[];
  integration: Value[];

  constructor(logging: Value[], monitoring: Value[], integration: Value[]) {
    this.logging = logging;
    this.monitoring = monitoring;
    this.integration = integration;
  }
}
