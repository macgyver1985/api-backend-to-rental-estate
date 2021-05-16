import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import PartnerDTO from '@layer/application/models/partner';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IReadingRepository, types as baseRepositories } from './interfaces';

@injectable()
export default class PartnerRepository implements IPartnerRepository {
  #TABLE: string;

  #readingRepository: IReadingRepository;

  public constructor(
  @inject(baseRepositories.IReadingRepository) readingRepository: IReadingRepository,
  ) {
    this.#TABLE = 'tb_partners';
    this.#readingRepository = readingRepository;
  }

  public async findAll(): Promise<PartnerDTO[]> {
    try {
      return await this.#readingRepository
        .findAll<PartnerDTO>(this.#TABLE);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findByQuery(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO[]> {
    try {
      return await this.#readingRepository
        .findByQuery<PartnerDTO>(this.#TABLE, predicate);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async findSpecific(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO> {
    try {
      return await this.#readingRepository
        .findSpecific<PartnerDTO>(this.#TABLE, predicate);
    } catch (e) {
      throw new Error(e);
    }
  }
}
