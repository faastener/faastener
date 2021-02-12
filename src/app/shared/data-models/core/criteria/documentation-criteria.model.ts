import {CriterionModel} from '../../classification/criterion.model';

export class DocumentationCriteria {
  functionDocs: CriterionModel;
  platformDocs: CriterionModel;

  getFunctionDocs() {
    return this.functionDocs;
  }

  getPlatformDocs() {
    return this.platformDocs;
  }
}
