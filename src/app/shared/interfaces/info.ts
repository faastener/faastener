/**
 * An interface representing a section grouping information resources.
 * Such sections represent different categories of additional information, e.g., research publications, blog posts, etc.
 */
import {TechnologyCategory} from './technology';

export interface InfoResourceSection {
  /**
   * Unique info section identifier.
   */
  id: string;

  /**
   * Section title.
   */
  title: string;

  /**
   * Section description.
   */
  description: string;

  /**
   * Technology category.
   */
  technologyCategory: TechnologyCategory;

  /**
   * A list of [InfoResources]{@link InfoResource} related to this section.
   */
  resources: InfoResource[];
}

/**
 * An interface representing an information resource related to a specific technology category.
 */
export interface InfoResource {
  /**
   * Unique resource identifier.
   */
  id?: string;

  /**
   * Resource name.
   */
  resource: string;

  /**
   * Resource reference.
   */
  reference: string;
}
