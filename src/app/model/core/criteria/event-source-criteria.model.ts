import {Criterion} from '../../shared/criterion.model';

export class EventSourceCriteria {
  private readonly syncEndpoint: Criterion;
  private readonly asyncEndpoint: Criterion;
  private readonly endpointCustomization: Criterion;
  private readonly tls: Criterion;
  private readonly fileDataStore: Criterion;
  private readonly database: Criterion;
  private readonly scheduler: Criterion;
  private readonly messageQueue: Criterion;
  private readonly streamProcessing: Criterion;
  private readonly specService: Criterion;
  private readonly integration: Criterion;

  constructor() {
    this.syncEndpoint = new Criterion('Synchronous endpoint calls');
    this.asyncEndpoint = new Criterion('Asynchronous endpoint calls');
    this.endpointCustomization = new Criterion('Endpoint name customization');
    this.tls = new Criterion('TLS support');
    this.fileDataStore = new Criterion('File level data stores');
    this.database = new Criterion('Database mode data stores');
    this.scheduler = new Criterion('Scheduler');
    this.messageQueue = new Criterion('Message queue');
    this.streamProcessing = new Criterion('Stream processing platform');
    this.specService = new Criterion('Special-purpose service');
    this.integration = new Criterion('Custom event integration');
  }

  getSyncEndpoint() {
    return this.syncEndpoint;
  }

  getAsyncEndpoint() {
    return this.asyncEndpoint;
  }

  getEndpointCustomization() {
    return this.endpointCustomization;
  }

  getTls() {
    return this.tls;
  }

  getFileDataStore() {
    return this.fileDataStore;
  }

  getDatabase() {
    return this.database;
  }

  getScheduler() {
    return this.scheduler;
  }

  getMessageQueue() {
    return this.messageQueue;
  }

  getStreamProcessing() {
    return this.streamProcessing;
  }

  getSpecService() {
    return this.specService;
  }

  getIntegration() {
    return this.integration;
  }
}
