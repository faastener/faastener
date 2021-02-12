import {CriterionInstanceModel} from '../classification/criterion-instance.model';

export interface PlatformDossierModel {
  platformID: string;
  reviewDate?: Date;
  reviewedCriteria: Set<CriterionInstanceModel>;
}
