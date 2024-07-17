export default class ObjectContainer {
  private context = new Map<string, any>();

  public addValue<T>(key: string, value: T) {
    this.context.set(key, value);
  }

  public getValue<T>(key: string): T {
    return this.context.get(key);
  }
}
