import {Value} from '../../shared/value.model';

export class DataStore {
  fileLevel: Value[];
  databaseMode: Value[];

  constructor(fileLevel: Value[],
              databaseMode: Value[]) {
    this.fileLevel = fileLevel;
    this.databaseMode = databaseMode;
  }
}
