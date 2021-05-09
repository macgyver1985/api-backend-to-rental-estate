export default interface IWritingRepository<T>{
  create(item: T): Promise<T>;

  update(item: T): Promise<T>;

  delete(item: T): Promise<T>;
}
