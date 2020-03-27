import {Criterion} from '../../shared/criterion.model';

export class QuotaCriteria {
  codeSize: Criterion;
  packageSize: Criterion;
  cpu: Criterion;
  memory: Criterion;
  execTime: Criterion;
  storage: Criterion;

  constructor() {
    this.codeSize = new Criterion('Deployment Quota: Code Size');
    this.packageSize = new Criterion('Deployment Quota: Package Size');
    this.cpu = new Criterion('Runtime Quota: CPU');
    this.memory = new Criterion('Runtime Quota: Memory');
    this.execTime = new Criterion('Runtime Quota: Execution Time');
    this.storage = new Criterion('Runtime Quota: Storage');
  }

  getCodeSize() {
    return this.codeSize;
  }

  getPackageSize() {
    return this.packageSize;
  }

  getCpu() {
    return this.cpu;
  }

  getMemory() {
    return this.memory;
  }

  getExecTime() {
    return this.execTime;
  }

  getStorage() {
    return this.storage;
  }
}
