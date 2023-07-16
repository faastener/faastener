import {CriterionInstance} from './classification';

/**
 * An interface representing a particular technology of some [TechnologyType]{@link TechnologyType}.
 */
export interface Technology {
  /**
   * Unique technology identifier.
   */
  id: string;

  /**
   * Technology name.
   */
  technologyName: string;

  /**
   * [Type]{@link TechnologyType} this technology belongs to.
   *
   * @example
   * Function-as-a-Service platforms
   */
  technologyType: TechnologyType;

  /**
   * Technology logo location.
   */
  logoLocation?: string;

  /**
   * Short description shown in technology lists.
   */
  shortDescription?: string;

  /**
   * Full description shown in technology details.
   */
  description?: string;
}

/**
 * An interface representing the review data which comprises [CriterionInstances]{@link CriterionInstance} related to a particular [Technology]{@link Technology}.
 */
export interface TechnologyDossier {
  /**
   * Unique technology identifier.
   */
  id: string;

  /**
   * Date of review.
   */
  reviewDate?: Date;

  /**
   * A list of CriterionInstance {@link CriterionInstance} encompassing the review data.
   */
  reviewedCriteria: CriterionInstance[];
}

/**
 * An enum representing different technology categories.
 *
 * @example
 * faas for Function-as-a-Service
 * baas for Blockchain-as-a-Service
 */
export enum TechnologyType {
  faas = 'faas', baas = 'baas'
}
