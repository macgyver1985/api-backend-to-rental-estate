import { IUserRepository } from '@layer/application/interfaces/sockets/repositories';
import UserDTO from '@layer/application/models/accessControl';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IReadingRepository, types as baseRepositories } from './interfaces';

@injectable()
export default class UserRepository implements IUserRepository {
  #TABLE: string;

  #readingRepository: IReadingRepository;

  public constructor(
  @inject(baseRepositories.IReadingRepository) readingRepository: IReadingRepository,
  ) {
    this.#TABLE = 'tb_users';
    this.#readingRepository = readingRepository;
  }

  public async findAll(): Promise<UserDTO[]> {
    try {
      return await this.#readingRepository
        .findAll<UserDTO>(this.#TABLE);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findByQuery(predicate: (item: UserDTO) => boolean): Promise<UserDTO[]> {
    try {
      return await this.#readingRepository
        .findByQuery<UserDTO>(this.#TABLE, predicate);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findSpecific(predicate: (item: UserDTO) => boolean): Promise<UserDTO> {
    try {
      return await this.#readingRepository
        .findSpecific<UserDTO>(this.#TABLE, predicate);
    } catch (e) {
      throw new Error(e);
    }
  }
}
