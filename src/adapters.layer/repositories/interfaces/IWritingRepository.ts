export default interface IWritingRepository {
  create<T>(table: string, item: T): Promise<T>;

  update<T>(table: string, item: T): Promise<T>;

  delete<T>(table: string, item: T): Promise<T>;
}
