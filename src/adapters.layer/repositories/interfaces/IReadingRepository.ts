export default interface IReadingRepository {
  findAll<T>(table: string): Promise<T[]>;

  findByQuery<T>(table: string, predicate: (item: T) => boolean): Promise<T[]>;

  findSpecific<T>(table: string, predicate: (item: T) => boolean): Promise<T>;
}
