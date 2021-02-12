import {CriterionValueModel} from '../../classification/criterion-value.model';

export class Endpoint {
  syncCall: CriterionValueModel[];
  asyncCall: CriterionValueModel[];
  endpointCustomization: CriterionValueModel;
  tls: CriterionValueModel;

  constructor(syncCall: CriterionValueModel[],
              asyncCall: CriterionValueModel[],
              endpointCustomization: CriterionValueModel,
              tls: CriterionValueModel) {
    this.syncCall = syncCall;
    this.asyncCall = asyncCall;
    this.endpointCustomization = endpointCustomization;
    this.tls = tls;
  }
}
