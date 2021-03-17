/**
 * An interface representing a server response with available classification frameworks.
 */
export interface ClassificationFrameworkResponse {
  id: string;
  name: string;
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
