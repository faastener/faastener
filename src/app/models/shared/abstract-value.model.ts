export abstract class AbstractValue {
  value: string;
  references: string[];

  protected constructor(value: string, references: string[]) {
    this.value = value;
    this.references = references;
  }
}
