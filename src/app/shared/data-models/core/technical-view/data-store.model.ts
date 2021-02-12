import {CriterionValueModel} from '../../classification/criterion-value.model';

export class DataStore {
  fileLevel: CriterionValueModel[];
  databaseMode: CriterionValueModel[];

  constructor(fileLevel: CriterionValueModel[],
              databaseMode: CriterionValueModel[]) {
    this.fileLevel = fileLevel;
    this.databaseMode = databaseMode;
  }
}
