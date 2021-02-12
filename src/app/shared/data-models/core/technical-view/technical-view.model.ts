import {Development} from './development.model';
import {Versioning} from './versioning.model';
import {EventSources} from './event-sources.model';
import {FunctionOrchestration} from './function-orchestration.model';
import {Testing} from './testing.model';
import {Debugging} from './debugging.model';
import {Observability} from './observability.model';
import {AppDelivery} from './app-delivery.model';
import {CodeReuse} from './code-reuse.model';
import {AccessManagement} from './access-management.model';

export class TechnicalView {
  development: Development;
  versioning: Versioning;
  eventSources: EventSources;
  functionOrchestration: FunctionOrchestration;
  testing: Testing;
  debugging: Debugging;
  observability: Observability;
  appDelivery: AppDelivery;
  codeReuse: CodeReuse;
  accessManagement: AccessManagement;
}

export class TechnicalViewBuilder {
  private readonly technicalView: TechnicalView;

  constructor() {
    this.technicalView = new TechnicalView();
  }

  development(data: Development): TechnicalViewBuilder {
    this.technicalView.development = data;
    return this;
  }

  versioning(data: Versioning): TechnicalViewBuilder {
    this.technicalView.versioning = data;
    return this;
  }

  eventSources(data: EventSources): TechnicalViewBuilder {
    this.technicalView.eventSources = data;
    return this;
  }

  functionOrchestration(data: FunctionOrchestration): TechnicalViewBuilder {
    this.technicalView.functionOrchestration = data;
    return this;
  }

  testing(data: Testing): TechnicalViewBuilder {
    this.technicalView.testing = data;
    return this;
  }

  debugging(data: Debugging): TechnicalViewBuilder {
    this.technicalView.debugging = data;
    return this;
  }

  observability(data: Observability): TechnicalViewBuilder {
    this.technicalView.observability = data;
    return this;
  }

  appDelivery(data: AppDelivery): TechnicalViewBuilder {
    this.technicalView.appDelivery = data;
    return this;
  }

  codeReuse(data: CodeReuse): TechnicalViewBuilder {
    this.technicalView.codeReuse = data;
    return this;
  }

  accessManagement(data: AccessManagement): TechnicalViewBuilder {
    this.technicalView.accessManagement = data;
    return this;
  }

  build(): TechnicalView {
    return this.technicalView;
  }
}
