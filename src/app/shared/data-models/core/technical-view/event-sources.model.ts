import {Endpoint} from './endpoint.model';
import {DataStore} from './data-store.model';
import {CriterionValueModel} from '../../classification/criterion-value.model';

export class EventSources {
  endpoint: Endpoint;
  dataStore: DataStore;
  scheduler: CriterionValueModel;
  messageQ: CriterionValueModel[];
  streamProc: CriterionValueModel[];
  specService: CriterionValueModel[];
  integration: CriterionValueModel[];

  constructor(endpoint: Endpoint,
              dataStore: DataStore,
              scheduler: CriterionValueModel,
              messageQ: CriterionValueModel[],
              streamProc: CriterionValueModel[],
              specService: CriterionValueModel[],
              integration: CriterionValueModel[]) {
    this.endpoint = endpoint;
    this.dataStore = dataStore;
    this.scheduler = scheduler;
    this.messageQ = messageQ;
    this.streamProc = streamProc;
    this.specService = specService;
    this.integration = integration;
  }
}
