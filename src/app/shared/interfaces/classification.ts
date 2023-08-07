import {TechnologyType} from './technology';

/**
 * An interface representing a generic classification framework, which comprises one or more {@link ClassificationViewCombination}.
 * Different combinations of classification views can be used to flexibly switch between different review representations for a given {@link TechnologyType}.
 */
export interface ClassificationFramework {
  /**
   * Unique framework identifier.
   */
  id: string;

  /**
   * Framework name.
   */
  name: string;

  /**
   * [Type]{@link TechnologyType} of technologies this framework helps to review.
   *
   * @example
   * Function-as-a-Service platforms
   */
  technologyType: TechnologyType;

  /**
   * Framework version (optional).
   */
  version?: string;

  /**
   * Framework description (optional).
   */
  description?: string;

  /**
   * A list of {@link ClassificationView} which organize the representation of criteria groupings.
   */
  frameworkViews: ClassificationView[];
}

/**
 * An interface representing a classification view which comprises one or more {@link CriteriaGrouping}.
 */
export interface ClassificationView {
  /**
   * Unique view identifier.
   */
  id: string;

  /**
   * View name.
   */
  name: string;

  /**
   * View description.
   */
  description: string;

  /**
   * A list of {@link CriteriaGrouping} which organize the representation of criteria and optional sub-groupings.
   */
  criteriaGroupings: CriteriaGrouping[];
}

/**
 * An interface representing a group of {@link ClassificationCriterion}.
 * Groupings can also contain other groupings, forming a hierarchy for criteria.
 */
export interface CriteriaGrouping {
  /**
   * Unique grouping identifier.
   */
  id: string;

  /**
   * Grouping locator which can be used, e.g., for custom breadcrumbs generation.
   * Reserved for future use.
   *
   * @example
   * "licensing", "community.github"
   */
  locator: string;

  /**
   * Grouping name.
   */
  name: string;

  /**
   * A list of [Sub-groupings]{@link CriteriaGrouping} which organize the representation of criteria and optional sub-groupings.
   */
  criteriaGroupings?: CriteriaGrouping[];

  /**
   * A list of {@link ClassificationCriterion} which describe a particular aspect of the reviewed technology.
   */
  criteria?: ClassificationCriterion[];
}

/**
 * An interface representing a classification criterion for a to-be-classified software.
 * Groupings can also contain other groupings, forming a hierarchy for criteria.
 *
 * @example a classification criterion representing runtimes supported by a FaaS platform
 */
export interface ClassificationCriterion {
  /**
   * Unique criterion identifier.
   */
  id: string;

  /**
   * Criterion name.
   */
  name: string;

  /**
   * Criterion description.
   */
  description: string;

  /**
   * Example values which this criterion can store.
   *
   * @example
   * a true/false value, numeric values, a list of strings
   */
  exampleValues?: string[];
}

/**
 * An interface representing a generic data value for the given {@link CriterionInstance}.
 */
export interface CriterionValue {
  /**
   * A value of primitive type representing criterion-specific review data.
   *
   * @example
   * "Java", "not supported", 150, true
   */
  value: string | number | boolean;
  /**
   * A list of references, e.g., to official documentation, confirming the review value (optional).
   */
  references?: string[];
  /**
   * An additional note describing the review value (optional).
   */
  comment?: string;
}
