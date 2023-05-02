type ObjectOrRecord = Record<string, string> | { [key: string]: string };

export class ClassNameMap<T extends ObjectOrRecord> {
  private target: T;
  keys: keyof T;

  constructor(target: T) {
    this.target = target;
    this.keys = target.keys;
  }

  get<K extends keyof T>(prop?: K): string {
    if (!prop) {
      return "";
    }
    return ` ${this.target[prop]} `;
  }
}
