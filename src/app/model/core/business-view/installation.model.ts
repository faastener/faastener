import {Value} from '../../shared/value.model';

export class Installation {
  type: Value;
  targetHosts: Value[];

  constructor(type: Value, targetHosts: Value[]) {
    this.type = type;
    this.targetHosts = targetHosts;
  }
}
