import {CriterionInstance} from './classification';

/**
 * An interface representing a technology for comparison,
 * which might contain the review data in a form of a {@link TechnologyDossier}.
 *
 * @example a FaaS platform
 */
export interface Technology {
  id: string;
  category: TechnologyCategory;
  logoLocator: string;
  logoLocation?: string;
  platformName: string;
  shortDescription?: string;
  description?: string;
  dossier?: TechnologyDossier;
}

/**
 * An interface representing a set of {@link CriterionInstance} related to a particular technology.
 */
export interface TechnologyDossier {
  platformId: string;
  reviewDate?: Date;
  reviewedCriteria: Set<CriterionInstance>;
}

export enum TechnologyCategory {
  faas = "faas"
}
