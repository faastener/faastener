import {Criterion} from '../../shared/criterion.model';

export class InstallationCriteria {
  installation: Criterion;
  targetHosts: Criterion;

  constructor() {
    this.installation = new Criterion('Installation type');
    this.targetHosts = new Criterion('Target hosts');
  }

  getInstallation() {
    return this.installation;
  }

  getTargetHosts() {
    return this.targetHosts;
  }
}
