import {Value} from '../../shared/value.model';

export class Documentation {
  functions: Value[];
  platform: Value[];

  constructor(functions: Value[], platform: Value[]) {
    this.functions = functions;
    this.platform = platform;
  }
}
