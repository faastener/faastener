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
