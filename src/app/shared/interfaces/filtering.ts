import {TechnologyType} from './dossier';

/**
 * An interface representing a rendered filter block in the UI which may comprise multiple filters with {@link CriterionFilterConfiguration}.
 */
export interface RenderedFilterBlock {
  /**
   * Name of the filter block
   */
  blockName: string;

  /**
   * Material Icon name
   */
  blockIcon?: string;

  /**
   * List of filters to be rendered in this block defined using {@link CriterionFilterConfiguration}
   */
  filters: CriterionFilterConfiguration[];
}

/**
 * An interface representing a filter configuration for a given technology {@link TechnologyType}.
 * This configuration defines which criteria have dedicated filter elements in the UI.
 */
export interface TechnologyFilterConfiguration {
  /**
   * Unique filter configuration identifier
   */
  filterId: string;

  /**
   * Technology category
   */
  technologyType: TechnologyType;

  /**
   * Configuration name
   */
  name: string;

  /**
   * List of filters to be rendered in this block defined using {@link CriterionFilterConfiguration}
   */
  filters: CriterionFilterConfiguration[];
}

/**
 * An interface representing a filter configuration for a given {@link ClassificationCriterion}.
 * This configuration defines the desired filtering behavior.
 */
export interface CriterionFilterConfiguration {
  /**
   * Unique criterion identifier
   */
  criterionTypeId: string;

  /**
   * Filter name
   */
  displayName: string;

  /**
   * Filter type {@see CriterionFilterType}
   */
  filterType: CriterionFilterType;

  /**
   * Distinct filter values obtained from the review data
   */
  filterValues?: [number, number] | string[];
}

/**
 * An enum representing a filter type for a given {@link CriterionFilterConfiguration}.
 * Based on these settings the respective filtering behavior is generated.
 */
export enum CriterionFilterType {
  /**
   * Indicates whether a value for a given criterion is true / false, translates to a toggle in the UI
   */
  bool = 'bool',

  /**
   * Indicates whether a value should be less than or equal to a given number, translates to a slider in the UI
   */
  lte = 'lte',

  /**
   * Indicates whether a value should be greater than or equal to a given number, translates to a slider in the UI
   */
  gte = 'gte',

  /**
   * At least 1 specified text value must be contained, translates to a group of checkboxes in the UI
   */
  containsOne = 'containsOne',

  /**
   * At least 1 arbitrary text value must be contained, translates to a toggle in the UI
   */
  containsAny = 'containsAny',

  /**
   * All specified text values must be contained, translates to a group of checkboxes in the UI
   */
  containsAll = 'containsAll',

  /**
   * All specified text values must not be contained, translates to a group of checkboxes in the UI
   */
  excludesAll = 'excludesAll'
}

/**
 * An interface representing a filter-based query mapping unique criteria IDs to respective [CriterionFilterValues]{@link CriterionFilterValue}.
 */
export interface CriteriaBasedQuery {
  [key: string]: CriterionFilterValue;
}

/**
 * An interface representing a filter value used in a user's query.
 */
export interface CriterionFilterValue {
  /**
   * Filter type
   */
  filterType?: CriterionFilterType;

  /**
   * Actual value, type depends on the filter type and respective UI elements.
   *
   * @example
   * a list of selected checkboxes resulting in a list of string values   *
   */
  value: boolean | number | string[];
}
