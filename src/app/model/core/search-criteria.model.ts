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
    this.licensing.getLicense().getValues().add(licensing.license.value);
    this.licensing.getLicenseType().getValues().add(licensing.type);
  }

  addInstallationCriteria(installations: Installation[]) {
    installations.forEach(i => {
      this.installation.getInstallation().getValues().add(i.type.value);
      i.targetHosts.forEach(host => this.installation.getTargetHosts().getValues().add(host.value));
    });
  }

  addCodeCriteria(code: SourceCode) {
    this.code.getAvailability().getValues().add(code.availability.value);
    this.code.getHostingPlatform().getValues().add(code.hostingPlatform.value);
    this.code.getMainLanguage().getValues().add(code.prgLang.value);
  }

  addInterfaceCriteria(i: Interfaces) {
    i.type.forEach(t => this.getInterface().getInterfaceTypes().getValues().add(t.value));
    i.appManagement.forEach(op => this.getInterface().getAppInterfaces().getValues().add(op.value));
    i.platformAdministration.forEach(op => this.getInterface().getPlatformInterfaces().getValues().add(op.value));
  }

  addDocumentationCriteria(d: Documentation) {
    d.functions.forEach(doc => this.getDocumentation().getFunctionDocs().getValues().add(doc.value));
    d.platform.forEach(doc => this.getDocumentation().getPlatformDocs().getValues().add(doc.value));
  }

  addQuotaCriteria(q: Quotas) {
    this.getQuotas().getCodeSize().getValues().add(q.deployment.codeSize.value);
    this.getQuotas().getPackageSize().getValues().add(q.deployment.packageSize.value);
    this.getQuotas().getCpu().getValues().add(q.runtime.cpu.value);
    this.getQuotas().getMemory().getValues().add(q.runtime.memory.value);
    this.getQuotas().getExecTime().getValues().add(q.runtime.executionTime.value);
    this.getQuotas().getStorage().getValues().add(q.runtime.storage.value);
  }

  addDevelopmentCriteria(development: Development) {
    development.funcRuntimes.forEach(r => this.getDevelopment().getRuntimes().getValues().add(r.value));
    development.editors.forEach(e => this.getDevelopment().getEditors().getValues().add(e.value));
    development.clientLibs.forEach(lib => this.getDevelopment().getClientLibs().getValues().add(lib.value));
    this.getDevelopment().getRuntimeCustomization().getValues().add(development.runtimeCustomization.value);
  }

  addVersioningCriteria(versioning: Versioning) {
    this.getVersioning().getFunctionVersion().getValues().add(versioning.funcVersions.value);
    this.getVersioning().getApplicationVersion().getValues().add(versioning.appVersions.value);
  }

  addEventSourcesCriteria(eventSources: EventSources) {
    eventSources.endpoint.syncCall.forEach(v => this.getEventSource().getSyncEndpoint().getValues().add(v.value));
    eventSources.endpoint.asyncCall.forEach(v => this.getEventSource().getAsyncEndpoint().getValues().add(v.value));
    this.getEventSource().getEndpointCustomization().getValues().add(eventSources.endpoint.endpointCustomization.value);
    this.getEventSource().getTls().getValues().add(eventSources.endpoint.tls.value);
    eventSources.dataStore.fileLevel.forEach(v => this.getEventSource().getFileDataStore().getValues().add(v.value));
    eventSources.dataStore.databaseMode.forEach(v => this.getEventSource().getDatabase().getValues().add(v.value));
    this.getEventSource().getScheduler().getValues().add(eventSources.scheduler.value);
    eventSources.messageQ.forEach(v => this.getEventSource().getMessageQueue().getValues().add(v.value));
    eventSources.streamProc.forEach(v => this.getEventSource().getStreamProcessing().getValues().add(v.value));
    eventSources.specService.forEach(v => this.getEventSource().getSpecService().getValues().add(v.value));
    eventSources.integration.forEach(v => this.getEventSource().getIntegration().getValues().add(v.value));
  }

  addOrchestrationCriteria(functionOrchestration: FunctionOrchestration) {
    this.getOrchestration().getOrchestrationType().getValues().add(functionOrchestration.workflowDef.type);
  }
}
