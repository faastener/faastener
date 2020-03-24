import {Value} from '../../shared/value.model';

export class AccessManagement {
  auth: Value[];
  accessControl: Value[];

  constructor(auth: Value[], accessControl: Value[]) {
    this.auth = auth;
    this.accessControl = accessControl;
  }
}
