import { readFile } from 'fs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { promisify } from 'util';
import { IReadingRepository } from './interfaces';

@injectable()
export default class JsonReadingRepository implements IReadingRepository {
  #readFileAsync = promisify(readFile);

  #DATA_BASE_DIR: string;

  public constructor() {
    this.#DATA_BASE_DIR = `${__dirname}/../resources/jsonDataBase/`;
  }

  public async findAll<T>(table: string): Promise<T[]> {
    const file = await this.#readFileAsync(`${this.#DATA_BASE_DIR}${table}.json`, 'utf8');

    if (file === '') {
      return [];
    }

    return <Array<T>>JSON.parse(file.toString());
  }

  public async findByQuery<T>(table: string, predicate: (item: T) => boolean): Promise<T[]> {
    const predic = predicate ?? (() => (true));

    const temp = await this.findAll<T>(table);

    const result = temp.filter((t) => predic(t));

    return result;
  }

  public async findSpecific<T>(table: string, predicate: (item: T) => boolean): Promise<T> {
    if (!predicate) {
      return null;
    }

    const temp = await this.findAll<T>(table);

    const result = temp.find((t) => predicate(t));

    return result;
  }
}
