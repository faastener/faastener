import {Value} from '../../shared/value.model';

export class AppDelivery {
  depAuto: Value[];
  ciCd: Value[];

  constructor(depAuto: Value[], ciCd: Value[]) {
    this.depAuto = depAuto;
    this.ciCd = ciCd;
  }
}
