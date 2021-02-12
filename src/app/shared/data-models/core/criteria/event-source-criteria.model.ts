import {CriterionModel} from '../../classification/criterion.model';

export class EventSourceCriteria {
  private readonly syncEndpoint: CriterionModel;
  private readonly asyncEndpoint: CriterionModel;
  private readonly endpointCustomization: CriterionModel;
  private readonly tls: CriterionModel;
  private readonly fileDataStore: CriterionModel;
  private readonly database: CriterionModel;
  private readonly scheduler: CriterionModel;
  private readonly messageQueue: CriterionModel;
  private readonly streamProcessing: CriterionModel;
  private readonly specService: CriterionModel;
  private readonly integration: CriterionModel;

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
