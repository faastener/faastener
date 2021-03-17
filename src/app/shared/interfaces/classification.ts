/**
 * An interface representing a generic classification framework, which comprises one or more {@link ClassificationViewCombination}
 * Different combinations of classification views can be used to flexibly switch between different representations.
 */
export interface ClassificationFramework {
  id: string;
  name: string;
  description?: string;
  viewCombinations: Set<ClassificationViewCombination>;
}

/**
 * An interface representing a combination of classifications view which comprises one or more {@link ClassificationView}
 */
export interface ClassificationViewCombination {
  id: string;
  name: string;
  description: string;
  views: Set<ClassificationView>;
  default?: boolean;
}

/**
 * An interface representing a classification view which comprises one or more {@link CriteriaGrouping}
 */
export interface ClassificationView {
  id: string;
  name: string;
  description: string;
  groupings: Set<CriteriaGrouping>;
}

/**
 * An interface representing a group of {@link ClassificationCriterion}.
 * Groupings can also contain other groupings, forming a hierarchy for criteria.
 */
export interface CriteriaGrouping {
  id: string;
  locator: string; // e.g. "licensing" or "community.github"
  name: string;
  groupings?: Set<CriteriaGrouping>;
  criteria?: Set<ClassificationCriterion>;
}

/**
 * An interface representing a classification criterion for a to-be-classified software.
 * Groupings can also contain other groupings, forming a hierarchy for criteria.
 *
 * @example a classification criterion representing runtimes supported by a FaaS platform
 */
export interface ClassificationCriterion {
  id: string;
  name: string;
  description: string;
  exampleValues?: Set<string>;
}

/**
 * An interface representing an instance of a classification criterion containing the collected data for a particular target.
 *
 * @example a set of runtimes supported by AWS Lambda.
 */
export interface CriterionInstance {
  criterionId: string;
  values: Set<CriterionValue>;
  reviewDate?: Date;
}

/**
 * An interface representing a generic data value for the given {@link CriterionInstance}.
 */
export class CriterionValue {
  value: string | number | boolean;
  references?: string[];
  comment?: string;
}
