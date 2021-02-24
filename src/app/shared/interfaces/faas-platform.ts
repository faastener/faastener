import {CriterionInstance} from './classification';

/**
 * An interface representing a Function-as-a-Service platform,
 * which might contain the review data in a form of a {@link FaasPlatformDossier}.
 */
export interface FaasPlatform {
  id: string;
  logoLocator: string;
  logoLocation?: string;
  platformName: string;
  shortDescription?: string;
  description?: string;
  dossier?: FaasPlatformDossier;
}

/**
 * An interface representing a set of {@link CriterionInstance} related to a particular FaaS platform.
 */
export interface FaasPlatformDossier {
  platformID: string;
  reviewDate?: Date;
  reviewedCriteria: Set<CriterionInstance>;
}
