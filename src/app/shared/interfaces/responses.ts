/**
 * An interface representing a server response with available classification frameworks.
 */
import {TechnologyInfo, TechnologyType} from './dossier';
import {ClassificationView, CriterionInstance} from './classification';

export interface ClassificationFrameworkResponse {
  id: string;
  technologyName: string;
  technologyType: TechnologyType;
  version?: string;
  description?: string;
  frameworkViews: Set<ClassificationView>;
}

export interface TechnologyDossierResponse {
  id: string;
  technologyName: string;
  reviewDate?: Date;
  technologyInfo: TechnologyInfo;
  reviewedCriteria: Set<CriterionInstance>;
}
