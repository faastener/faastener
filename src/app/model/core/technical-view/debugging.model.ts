import {Value} from '../../shared/value.model';

export class Debugging {
  local: Value[];
  remote: Value[];

  constructor(local: Value[], remote: Value[]) {
    this.local = local;
    this.remote = remote;
  }
}
