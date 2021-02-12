export interface CriterionModel {
  id: string;
  name: string;
  description: string;
  exampleValues?: Set<string>;
  values?: Set<string>;
}
