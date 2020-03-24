import {Value} from '../../shared/value.model';

export class Testing {
  functional: Value[];
  nonFunctional: Value[];

  constructor(functional: Value[], nonFunctional: Value[]) {
    this.functional = functional;
    this.nonFunctional = nonFunctional;
  }
}
