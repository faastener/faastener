import {CriterionModel} from '../../classification/criterion.model';

export class InstallationCriteria {
  installation: CriterionModel;
  targetHosts: CriterionModel;

  getInstallation() {
    return this.installation;
  }

  getTargetHosts() {
    return this.targetHosts;
  }
}
