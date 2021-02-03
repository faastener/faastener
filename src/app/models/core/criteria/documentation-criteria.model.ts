import {Criterion} from '../../shared/criterion.model';

export class DocumentationCriteria {
  functionDocs: Criterion;
  platformDocs: Criterion;

  constructor() {
    this.functionDocs = new Criterion('Application development documentation');
    this.platformDocs = new Criterion('Platform documentation');
  }

  getFunctionDocs() {
    return this.functionDocs;
  }

  getPlatformDocs() {
    return this.platformDocs;
  }
}
