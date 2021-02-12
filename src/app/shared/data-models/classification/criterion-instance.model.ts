import {CriterionValueModel} from './criterion-value.model';

export interface CriterionInstanceModel {
  criterionId: string;
  values: Set<CriterionValueModel>;
  reviewDate?: Date;
}
