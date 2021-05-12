import { IPartnerRepository } from '@layer/application/interfaces/sockets/repositories';
import PartnerDTO from '@layer/application/models/partner';
import { readFile } from 'fs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { promisify } from 'util';

const readFileAsync = promisify(readFile);

@injectable()
export default class PartnerRepository implements IPartnerRepository {
  #FILE_NAME: string;

  public constructor() {
    this.#FILE_NAME = `${__dirname}/partner.json`;
  }

  public async findAll(): Promise<PartnerDTO[]> {
    const file = await readFileAsync(this.#FILE_NAME, 'utf8');

    if (file === '') {
      return [];
    }

    return <Array<PartnerDTO>>JSON.parse(file.toString());
  }

  public async findByQuery(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO[]> {
    const predic = predicate ?? (() => (true));

    const temp = await this.findAll();

    const result = temp.filter((t) => predic(t));

    return result;
  }

  public async findSpecific(predicate: (item: PartnerDTO) => boolean): Promise<PartnerDTO> {
    if (!predicate) {
      return null;
    }

    const temp = await this.findAll();

    const result = temp.find((t) => predicate(t));

    return result;
  }
}
