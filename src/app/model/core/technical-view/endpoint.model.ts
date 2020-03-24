import {Value} from '../../shared/value.model';

export class Endpoint {
  syncCall: Value[];
  asyncCall: Value[];
  endpointCustomization: Value;
  tls: Value;

  constructor(syncCall: Value[],
              asyncCall: Value[],
              endpointCustomization: Value,
              tls: Value) {
    this.syncCall = syncCall;
    this.asyncCall = asyncCall;
    this.endpointCustomization = endpointCustomization;
    this.tls = tls;
  }
}
