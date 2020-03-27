import {Criterion} from '../shared/criterion.model';
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

export class SearchCriteria {
  licensing: LicensingCriteria;
  release: Criterion;
  installation: InstallationCriteria;
  code: CodeCriteria;
  interface: InterfaceCriteria;
  documentation: DocumentationCriteria;
  quotas: QuotaCriteria;

  constructor() {
    this.licensing = new LicensingCriteria();
    this.release = new Criterion('Release status');
    this.installation = new InstallationCriteria();
    this.code = new CodeCriteria();
    this.interface = new InterfaceCriteria();
    this.documentation = new DocumentationCriteria();
    this.quotas = new QuotaCriteria();
  }

  getLicensing() {
    return this.licensing;
  }

  getRelease() {
    return this.release;
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
}
