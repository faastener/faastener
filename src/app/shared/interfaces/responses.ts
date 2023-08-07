/**
 * An interface representing a server response with available classification frameworks.
 */
import {TechnologyType} from './technology';
import {ClassificationView, CriterionValue} from './classification';

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
  dossier?: TechnologyDossierResponse;
}

export interface TechnologyDossierResponse {
  id: string;
  technologyId: string;
  reviewDate?: Date;
  reviewedCriteria: Map<string, CriterionValue[]>;
}
