export class WorkflowDefinition {
  type: string;
  languages: string[];
  references: string[];

  constructor(type: string, languages: string[], references: string[]) {
    this.type = type;
    this.languages = languages;
    this.references = references;
  }
}
