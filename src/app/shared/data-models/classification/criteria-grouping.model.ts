import {CriterionModel} from './criterion.model';

export interface CriteriaGroupingModel {
  id: string;
  locator: string; // e.g. "licensing" or "community.github"
  name: string;
  groupings?: Set<CriteriaGroupingModel>;
  criteria?: Set<CriterionModel>;
}
