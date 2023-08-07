import {CriterionValue} from "./classification";

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

  /**
   * Technology dossier with the review data.
   */
  dossier?: TechnologyDossier;
}

/**
 * An interface representing the review data which comprises review data related to a particular [Technology]{@link Technology}.
 */
export interface TechnologyDossier {
  /**
   * Unique dossier identifier.
   */
  id: string;

  /**
   * Unique technology identifier.
   */
  technologyId: string;

  /**
   * Date of review.
   */
  reviewDate?: Date;

  /**
   * A map of values {@link CriterionValue} encompassing the review data for the criterion ID.
   */
  reviewedCriteria: Map<string, CriterionValue[]>;
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

export class TechnologyTypeUtil {
  public static toString(type: TechnologyType): string {
    switch (type) {
      case TechnologyType.faas:
        return "Function-as-a-Service";
      case TechnologyType.baas:
        return "Blockchain-as-a-Service";
      default:
        return "";
    }
  }
}
