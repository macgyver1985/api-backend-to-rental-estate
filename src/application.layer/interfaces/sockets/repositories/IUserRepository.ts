import UserDTO from '@layer/application/models/accessControl';

export default interface IUserRepository {
  findAll(): Promise<UserDTO[]>;

  findByQuery(predicate: (item: UserDTO) => boolean): Promise<UserDTO[]>;

  findSpecific(predicate: (item: UserDTO) => boolean): Promise<UserDTO>;
}
