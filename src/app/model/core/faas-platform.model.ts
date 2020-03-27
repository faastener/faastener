import {BusinessView} from './business-view/business-view.model';
import {TechnicalView} from './technical-view/technical-view.model';

export class FaaSPlatform {
  id: string;
  platformName: string;
  logoPath: string;
  description: string;
  descriptionOfficial: string;
  businessView: BusinessView;
  technicalView: TechnicalView;

  public hasTargetHosts(): boolean {
    return this.businessView.installations.some(i => i.targetHosts.length > 0);
  }

  getPropertyValueByFilterName(name: string) {
    if (name === 'license') {
      return new Array<string>(this.businessView.licensing.license.value);
    } else if (name === 'licenseType') {
      return new Array<string>(this.businessView.licensing.type);
    } else if (name === 'installationType') {
      return this.businessView.installations.map(i => {
        return i.type.value;
      });
    } else if (name === 'targetHosts') {
      const result: string[] = [];
      this.businessView.installations.map(i => {
        i.targetHosts.forEach(h => result.push(h.value));
      });
      return result;
    } else if (name === 'codeAvailability') {
      return new Array<string>(this.businessView.sourceCode.availability.value);
    } else if (name === 'codeHostingPlatform') {
      return new Array<string>(this.businessView.sourceCode.hostingPlatform.value);
    } else if (name === 'codeProgLanguage') {
      return new Array<string>(this.businessView.sourceCode.prgLang.value);
    } else if (name === 'interfaceTypes') {
      return this.businessView.interfaces.type.map(it => {
        return it.value;
      });
    } else if (name === 'appInterfaceOps') {
      return this.businessView.interfaces.appManagement.map(it => {
        return it.value;
      });
    } else if (name === 'platformAdminOps') {
      return this.businessView.interfaces.platformAdministration.map(it => {
        return it.value;
      });
    } else if (name === 'appDoc') {
      return this.businessView.documentation.functions.map(it => {
        return it.value;
      });
    } else if (name === 'platformDoc') {
      return this.businessView.documentation.platform.map(it => {
        return it.value;
      });
    } else if (name === 'qCodeSize') {
      return new Array<string>(this.businessView.quotas.deployment.codeSize.value);
    } else if (name === 'qPackageSize') {
      return new Array<string>(this.businessView.quotas.deployment.packageSize.value);
    } else if (name === 'qCpu') {
      return new Array<string>(this.businessView.quotas.runtime.cpu.value);
    } else if (name === 'qMemory') {
      return new Array<string>(this.businessView.quotas.runtime.memory.value);
    } else if (name === 'qExecTime') {
      return new Array<string>(this.businessView.quotas.runtime.executionTime.value);
    } else if (name === 'qStorage') {
      return new Array<string>(this.businessView.quotas.runtime.storage.value);
    } else if (name === 'devRuntimes') {
      return this.technicalView.development.funcRuntimes.map(r => {
        return r.value;
      });
    } else if (name === 'runtimeCustomization') {
      return new Array<string>(this.technicalView.development.runtimeCustomization.value);
    } else if (name === 'devEditors') {
      return this.technicalView.development.editors.map(e => {
        return e.value;
      });
    } else if (name === 'clientLibs') {
      return this.technicalView.development.clientLibs.map(lib => {
        return lib.value;
      });
    }
    return [];
  }
}

export class FaaSPlatformBuilder {
  private readonly faaSPlatform: FaaSPlatform;

  constructor() {
    this.faaSPlatform = new FaaSPlatform();
  }

  platformName(platformName: string): FaaSPlatformBuilder {
    this.faaSPlatform.id = platformName.replace(/\s/g, '').toLowerCase();
    this.faaSPlatform.platformName = platformName;
    return this;
  }

  logoPath(logoPath: string): FaaSPlatformBuilder {
    this.faaSPlatform.logoPath = logoPath;
    return this;
  }

  description(description: string): FaaSPlatformBuilder {
    this.faaSPlatform.description = description;
    return this;
  }

  descriptionOfficial(descriptionOfficial: string): FaaSPlatformBuilder {
    this.faaSPlatform.descriptionOfficial = descriptionOfficial;
    return this;
  }

  businessView(data: BusinessView): FaaSPlatformBuilder {
    this.faaSPlatform.businessView = data;
    return this;
  }

  technicalView(data: TechnicalView): FaaSPlatformBuilder {
    this.faaSPlatform.technicalView = data;
    return this;
  }

  build(): FaaSPlatform {
    return this.faaSPlatform;
  }
}
