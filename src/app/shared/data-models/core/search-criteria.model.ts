import {LicensingCriteria} from './criteria/licensing-criteria.model';
import {InstallationCriteria} from './criteria/installation-criteria.model';
import {CodeCriteria} from './criteria/code-criteria.model';
import {InterfaceCriteria} from './criteria/interface-criteria.model';
import {DocumentationCriteria} from './criteria/documentation-criteria.model';
import {QuotaCriteria} from './criteria/quota-criteria.model';
import {License} from './business-view/license.model';
import {Installation} from './business-view/installation.model';
import {SourceCode} from './business-view/source-code.model';
import {Interfaces} from './business-view/interfaces.model';
import {Documentation} from './business-view/documentation';
import {Quotas} from './business-view/quotas.model';
import {Development} from './technical-view/development.model';
import {Versioning} from './technical-view/versioning.model';
import {EventSources} from './technical-view/event-sources.model';
import {DevelopmentCriteria} from './criteria/development-criteria.model';
import {VersioningCriteria} from './criteria/versioning-criteria.model';
import {EventSourceCriteria} from './criteria/event-source-criteria.model';
import {OrchestrationCriteria} from './criteria/orchestration-criteria.model';
import {FunctionOrchestration} from './technical-view/function-orchestration.model';

export class SearchCriteria {
  private readonly licensing: LicensingCriteria;
  private readonly installation: InstallationCriteria;
  private readonly code: CodeCriteria;
  private readonly interface: InterfaceCriteria;
  private readonly documentation: DocumentationCriteria;
  private readonly quotas: QuotaCriteria;
  private readonly development: DevelopmentCriteria;
  private readonly versioning: VersioningCriteria;
  private readonly eventSource: EventSourceCriteria;
  private readonly orchestration: OrchestrationCriteria;

  constructor() {
    this.licensing = new LicensingCriteria();
    this.installation = new InstallationCriteria();
    this.code = new CodeCriteria();
    this.interface = new InterfaceCriteria();
    this.documentation = new DocumentationCriteria();
    this.quotas = new QuotaCriteria();
    this.development = new DevelopmentCriteria();
    this.versioning = new VersioningCriteria();
    this.eventSource = new EventSourceCriteria();
    this.orchestration = new OrchestrationCriteria();
  }

  getLicensing() {
    return this.licensing;
  }

  getInstallation() {
    return this.installation;
  }

  getCode() {
    return this.code;
  }

  getInterface() {
    return this.interface;
  }

  getDocumentation() {
    return this.documentation;
  }

  getQuotas() {
    return this.quotas;
  }

  getDevelopment() {
    return this.development;
  }

  getVersioning() {
    return this.versioning;
  }

  getEventSource() {
    return this.eventSource;
  }

  getOrchestration() {
    return this.orchestration;
  }

  addLicensingCriteria(licensing: License) {
    this.licensing.getLicense().values.add(licensing.license.value);
    this.licensing.getLicenseType().values.add(licensing.type);
  }

  addInstallationCriteria(installations: Installation[]) {
    installations.forEach(i => {
      this.installation.getInstallation().values.add(i.type.value);
      i.targetHosts.forEach(host => this.installation.getTargetHosts().values.add(host.value));
    });
  }

  addCodeCriteria(code: SourceCode) {
    this.code.getAvailability().values.add(code.availability.value);
    this.code.getHostingPlatform().values.add(code.hostingPlatform.value);
    this.code.getMainLanguage().values.add(code.prgLang.value);
  }

  addInterfaceCriteria(i: Interfaces) {
    i.type.forEach(t => this.getInterface().getInterfaceTypes().values.add(t.value));
    i.appManagement.forEach(op => this.getInterface().getAppInterfaces().values.add(op.value));
    i.platformAdministration.forEach(op => this.getInterface().getPlatformInterfaces().values.add(op.value));
  }

  addDocumentationCriteria(d: Documentation) {
    d.functions.forEach(doc => this.getDocumentation().getFunctionDocs().values.add(doc.value));
    d.platform.forEach(doc => this.getDocumentation().getPlatformDocs().values.add(doc.value));
  }

  addQuotaCriteria(q: Quotas) {
    this.getQuotas().getPackageSize().values.add(q.packageSize.value);
    this.getQuotas().getExecTime().values.add(q.executionTime.value);
  }

  addDevelopmentCriteria(development: Development) {
    development.funcRuntimes.forEach(r => this.getDevelopment().getRuntimes().values.add(r.value));
    development.editors.forEach(e => this.getDevelopment().getEditors().values.add(e.value));
    development.clientLibs.forEach(lib => this.getDevelopment().getClientLibs().values.add(lib.value));
    this.getDevelopment().getRuntimeCustomization().values.add(development.runtimeCustomization.value);
  }

  addVersioningCriteria(versioning: Versioning) {
    this.getVersioning().getFunctionVersion().values.add(versioning.funcVersions.value);
    this.getVersioning().getApplicationVersion().values.add(versioning.appVersions.value);
  }

  addEventSourcesCriteria(eventSources: EventSources) {
    eventSources.endpoint.syncCall.forEach(v => this.getEventSource().getSyncEndpoint().values.add(v.value));
    eventSources.endpoint.asyncCall.forEach(v => this.getEventSource().getAsyncEndpoint().values.add(v.value));
    this.getEventSource().getEndpointCustomization().values.add(eventSources.endpoint.endpointCustomization.value);
    this.getEventSource().getTls().values.add(eventSources.endpoint.tls.value);
    eventSources.dataStore.fileLevel.forEach(v => this.getEventSource().getFileDataStore().values.add(v.value));
    eventSources.dataStore.databaseMode.forEach(v => this.getEventSource().getDatabase().values.add(v.value));
    this.getEventSource().getScheduler().values.add(eventSources.scheduler.value);
    eventSources.messageQ.forEach(v => this.getEventSource().getMessageQueue().values.add(v.value));
    eventSources.streamProc.forEach(v => this.getEventSource().getStreamProcessing().values.add(v.value));
    eventSources.specService.forEach(v => this.getEventSource().getSpecService().values.add(v.value));
    eventSources.integration.forEach(v => this.getEventSource().getIntegration().values.add(v.value));
  }

  addOrchestrationCriteria(functionOrchestration: FunctionOrchestration) {
    this.getOrchestration().getOrchestrationType().values.add(functionOrchestration.workflowDef.type);
  }
}
