import {Value} from '../../shared/value.model';

export class CodeReuse {
  marketplaces: Value[];
  sampleRepos: Value[];

  constructor(marketplaces: Value[], sampleRepos: Value[]) {
    this.marketplaces = marketplaces;
    this.sampleRepos = sampleRepos;
  }
}
