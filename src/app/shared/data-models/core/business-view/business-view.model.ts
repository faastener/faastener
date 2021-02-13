import {License} from './license.model';
import {Installation} from './installation.model';
import {SourceCode} from './source-code.model';
import {Interfaces} from './interfaces.model';
import {Community} from './community.model';
import {Documentation} from './documentation';

export class BusinessView {
  licensing: License;
  installations: Installation[];
  sourceCode: SourceCode;
  interfaces: Interfaces;
  community: Community;
  documentation: Documentation;
}

export class BusinessViewBuilder {
  private readonly businessView: BusinessView;

  constructor() {
    this.businessView = new BusinessView();
  }

  licensing(data: License): BusinessViewBuilder {
    this.businessView.licensing = data;
    return this;
  }

  installations(data: Installation[]): BusinessViewBuilder {
    this.businessView.installations = data;
    return this;
  }

  sourceCode(data: SourceCode): BusinessViewBuilder {
    this.businessView.sourceCode = data;
    return this;
  }

  interfaces(data: Interfaces): BusinessViewBuilder {
    this.businessView.interfaces = data;
    return this;
  }

  community(data: Community): BusinessViewBuilder {
    this.businessView.community = data;
    return this;
  }

  documentation(data: Documentation): BusinessViewBuilder {
    this.businessView.documentation = data;
    return this;
  }

  build(): BusinessView {
    return this.businessView;
  }
}