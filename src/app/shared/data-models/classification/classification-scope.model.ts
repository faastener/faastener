import {CriteriaGroupingModel} from './criteria-grouping.model';

export interface ClassificationScopeModel {
  id: string;
  name: string;
  description: string;
  groupings: Set<CriteriaGroupingModel>;
}
