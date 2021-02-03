export class Criterion {
  name: string;
  values: Set<string>;

  public constructor(name: string) {
    this.name = name;
    this.values = new Set<string>();
  }

  getName(): string {
    return this.name;
  }

  getValues(): Set<string> {
    return this.values;
  }

  addValue(v: string): void {
    this.values.add(v);
  }
}
