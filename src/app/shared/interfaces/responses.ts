/**
 * An interface representing a server response with available classification frameworks.
 */
import {TechnologyType} from './technology';
import {ClassificationView, CriterionInstance} from './classification';

export interface ClassificationFrameworkResponse {
  id: string;
  name: string;
  technologyType: TechnologyType;
  version?: string;
  description?: string;
  frameworkViews: ClassificationView[];
}

export interface TechnologyResponse {
  id: string;
  technologyName: string;
  technologyType: TechnologyType;
  logoLocation?: string;
  shortDescription?: string;
  description?: string;
}

export interface TechnologyDossierResponse {
  id: string;
  reviewDate?: Date;
  reviewedCriteria: CriterionInstance[];
}
