import {License} from './license.model';
import {Installation} from './installation.model';
import {Value} from '../../shared/value.model';
import {SourceCode} from './source-code.model';
import {Interfaces} from './interfaces.model';
import {Community} from './community.model';
import {Documentation} from './documentation';
import {Quotas} from './quotas.model';

export class BusinessView {
    licensing: License;
    installations: Installation[];
    sourceCode: SourceCode;
    release: Value;
    interfaces: Interfaces;
    community: Community;
    documentation: Documentation;
    quotas: Quotas;
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

    release(data: Value): BusinessViewBuilder {
        this.businessView.release = data;
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

    quotas(data: Quotas): BusinessViewBuilder {
        this.businessView.quotas = data;
        return this;
    }

    build(): BusinessView {
        return this.businessView;
    }
}
