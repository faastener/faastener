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
  filterType: CriterionFilterType;
  filterValues?: [number, number] | string[];
}

/**
 * An enum representing a filter type for a given {@link CriterionFilterConfiguration}.
 * Based on these settings the respective filtering behavior is generated.
 *
 * @remarks
 * Available options:
 * -- exists:  indicates whether any value is present for a given criterion, translates to a toggle in the UI
 * -- lte: indicates whether a value should be less than or equal to a given number, translates to a slider in the UI
 * -- containsOne: at least 1 specified text value must be contained, translates to a group of checkboxes in the UI
 * -- containsAll: all specified text values must be contained, translates to a group of checkboxes in the UI
 * -- excludesAll: all specified text values must not be contained, translates to a group of checkboxes in the UI
 */
export enum CriterionFilterType {
  exists = 'exists',
  lte = 'lte',
  containsOne = 'containsOne',
  containsAll = 'containsAll',
  excludesAll = 'excludesAll'
}


export interface CriteriaBasedQuery {
  [key: string]: CriterionFilterValue;
}

export interface CriterionFilterValue {
  filterType?: CriterionFilterType;
  value: boolean | number | string[];
}
