import {CriterionValueModel} from '../../classification/criterion-value.model';

export class CodeReuse {
  marketplaces: CriterionValueModel[];
  sampleRepos: CriterionValueModel[];

  constructor(marketplaces: CriterionValueModel[], sampleRepos: CriterionValueModel[]) {
    this.marketplaces = marketplaces;
    this.sampleRepos = sampleRepos;
  }
}
