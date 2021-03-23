export interface RenderedFilter {
  blocks: RenderedFilterBlock[];
}

export interface RenderedFilterBlock {
  blockName: string;
  blockIcon?: string;
  filters: CriterionFilterConfiguration[];
}


/**
 * An interface representing a filter configuration for a given technology {@link TechnologyCategory}.
 * This configuration defines which criteria have dedicated filter elements in the UI.
 */
export interface TechnologyFilterConfiguration {
  filterId: string;
  technologyCategory: string;
  name: string;
  filters: CriterionFilterConfiguration[];
}

/**
 * An interface representing a filter configuration for a given {@link ClassificationCriterion}.
 * This configuration defines the desired filtering behavior.
 */
export interface CriterionFilterConfiguration {
  criterionId: string;
  displayName: string;
  filterSettings: CriterionFilterSettings;
  filterValues?: [number, number] | string[];
}

/**
 * An interface representing filter settings for a given {@link CriterionFilterConfiguration}.
 * Based on these settings the respective filtering UI is generated.
 *
 * @remarks
 * Available options:
 * -- numericLTEFilter: indicates whether a value should be less than or equal to a given number, translates to a slider
 * -- textContainmentFilter:
 *
 */
export interface CriterionFilterSettings {
  /**
   * This setting indicates whether any value is present for a given criterion.
   * This filter translates to a toggle element in the UI.
   */
  existenceFilter?: boolean;

  /**
   * This setting indicates whether a value should be less than or equal to a given number.
   * This filter translates to a slider element in the UI.
   */
  numericLTEFilter?: number;

  /**
   * This setting indicates whether specific text values are expected.
   * This filter translates to a select element in the UI.
   */
  textContainmentFilter?: string[];

  /**
   * This setting indicates the desired containment options:
   *  -- atLeastOne: at least 1 provided text value must be contained
   *  -- containsAll: all provided text values must be contained
   *  -- excludesAll: all provided text values must not be contained
   *  -- nonEmpty: any text value must be present
   */
  textContainmentOptions?: TextContainmentOption;
}

/**
 * An interface representing a filter-based query for a given technology.
 * The query is based on a specific {@link TechnologyFilterConfiguration} and contains filter values provided by users for different criteria {@link CriterionFilterValue}.
 */
export interface FilterBasedQuery {
  filterId: string;
  filters: Map<string, CriterionFilterValue>;
}

export interface CriterionFilterValue {
  exists?: boolean;
  lte?: number;
  text?: string[];
  containmentOption?: TextContainmentOption;
}

export enum TextContainmentOption {
  atLeastOne, containsAll, excludesAll, nonEmpty
}
