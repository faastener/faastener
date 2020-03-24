import {Value} from '../../shared/value.model';

class DeploymentQuotas {
  codeSize: Value;
  packageSize: Value;

  constructor(codeSize: Value, packageSize: Value) {
    this.codeSize = codeSize;
    this.packageSize = packageSize;
  }
}

class RuntimeQuotas {
  cpu: Value;
  memory: Value;
  storage: Value;
  executionTime: Value;

  constructor(cpu: Value, memory: Value, storage: Value, executionTime: Value) {
    this.cpu = cpu;
    this.memory = memory;
    this.storage = storage;
    this.executionTime = executionTime;
  }
}

export class Quotas {
  deployment: DeploymentQuotas;
  runtime: RuntimeQuotas;

  constructor(deployment: DeploymentQuotas, runtime: RuntimeQuotas) {
    this.deployment = deployment;
    this.runtime = runtime;
  }
}
