export default interface IReadingRepository<T>{
  findAll(): Promise<T[]>;

  findByQuery(predicate: (item: T) => boolean): Promise<T[]>;

  findSpecific(predicate: (item: T) => boolean): Promise<T>;
}
