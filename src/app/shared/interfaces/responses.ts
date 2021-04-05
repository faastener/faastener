/**
 * An interface representing a server response with available classification frameworks.
 */
import {TechnologyCategory} from './technology';
import {CriterionInstance} from './classification';

export interface ClassificationFrameworkResponse {
  id: string;
  name: string;
  technologyCategory: TechnologyCategory;
  description?: string;
  viewCombinationIds: Set<string>;
}

/**
 * An interface representing a server response with available combinations of classification views.
 */
export interface ClassificationViewCombinationResponse {
  id: string;
  name: string;
  description: string;
  viewIds: Set<string>;
  default?: boolean;
}

/**
 * An interface representing a server response with available classification views.
 */
export interface ClassificationViewResponse {
  id: string;
  name: string;
  description: string;
  groupingIds: Set<string>;
}

/**
 * An interface representing a server response with available criteria groupings.
 */
export interface CriteriaGroupingResponse {
  id: string;
  name: string;
  locator: string; // e.g. "licensing" or "community.github"
  parentId?: string;
  criteriaIds?: Set<string>;
}

export interface TechnologyDossierResponse {
  platformId: string;
  reviewDate?: Date;
  reviewedCriteria: CriteriaReview;
}

export interface CriteriaReview {
  [key: string]: CriterionInstance;
}
