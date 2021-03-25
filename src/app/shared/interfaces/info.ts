/**
 * An interface representing a section grouping information resources.
 * Such sections represent different categories of additional information, e.g., research publications, blog posts, etc.
 */
export interface InfoResourceSection {
  id: string;
  title: string;
  description: string;
  resources: InfoResource[];
}

/**
 * An interface representing an information resource related to a specific technology category.
 */
export interface InfoResource {
  id?: string;
  technologyCategory: string;
  resource: string;
  reference: string;
}
