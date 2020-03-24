import {Value} from '../../shared/value.model';

export class Interfaces {
  type: Value[];
  appManagement: Value[];
  platformAdministration: Value[];

  constructor(type: Value[], appManagement: Value[], platformAdministration: Value[]) {
    this.type = type;
    this.appManagement = appManagement;
    this.platformAdministration = platformAdministration;
  }
}
