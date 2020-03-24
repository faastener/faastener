import {Value} from '../../shared/value.model';
import {Endpoint} from './endpoint.model';
import {DataStore} from './data-store.model';

export class EventSources {
  endpoint: Endpoint;
  dataStore: DataStore;
  scheduler: Value;
  messageQ: Value[];
  streamProc: Value[];
  specService: Value[];
  integration: Value[];

  constructor(endpoint: Endpoint,
              dataStore: DataStore,
              scheduler: Value,
              messageQ: Value[],
              streamProc: Value[],
              specService: Value[],
              integration: Value[]) {
    this.endpoint = endpoint;
    this.dataStore = dataStore;
    this.scheduler = scheduler;
    this.messageQ = messageQ;
    this.streamProc = streamProc;
    this.specService = specService;
    this.integration = integration;
  }
}
