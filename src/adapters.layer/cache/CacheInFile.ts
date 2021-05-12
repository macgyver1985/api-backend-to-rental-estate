import { ICache, ICacheOptions } from '@layer/application/interfaces/sockets/cache';
import fs from 'fs';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { promisify } from 'util';

const unlinkAsync = promisify(fs.unlink);
const mkdirAsync = promisify(fs.mkdir);
const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const writeFileAsync = promisify(fs.writeFile);

@injectable()
export default class CacheInFile implements ICache {
    #dir: string;

    public constructor() {
      this.#dir = `${__dirname}/../../../cache/`;
    }

    #createDir = async (): Promise<void> => {
      try {
        await statAsync(this.#dir);
      } catch (e) {
        await mkdirAsync(this.#dir);
      }
    };

    #clearAll = async (listFiles: Array<string>): Promise<void> => {
      if (listFiles && listFiles.length > 0) {
        const prom: Array<Promise<void>> = [];

        listFiles.forEach((t) => {
          prom.push(unlinkAsync(`${this.#dir}${t}`));
        });

        await Promise.all(prom);
      }
    };

    public async register(
      key: string,
      context: string,
      data: Buffer,
      options?: ICacheOptions,
    ): Promise<boolean> {
      try {
        await this.#createDir();

        let expireIn: number = (new Date()).getTime() + 3600000;

        if (options?.expireIn) {
          expireIn = options.expireIn > -1
            ? (new Date()).getTime() + (options.expireIn * 1000)
            : -1;
        }

        const files = await readdirAsync(this.#dir);
        const listFiles = files?.filter((t) => t.indexOf(`${context}_${key}`) !== -1);

        await this.#clearAll(listFiles);

        await writeFileAsync(`${this.#dir}${context}_${key}.${expireIn}`, data, {
          encoding: 'utf-8',
        });
      } catch (e) {
        return false;
      }
      return true;
    }

    public async delete(key: string, context: string): Promise<boolean> {
      try {
        const files = await readdirAsync(this.#dir);
        const listFiles = files?.filter((t) => t.indexOf(`${context}_${key}`) !== -1);

        await this.#clearAll(listFiles);

        return true;
      } catch (e) {
        return false;
      }
    }

    public async obtain(key: string, context: string): Promise<Buffer> {
      try {
        const files = await readdirAsync(this.#dir);
        const listFiles = files?.filter((t) => t.indexOf(`${context}_${key}`) !== -1);

        if (listFiles && listFiles.length > 0) {
          const file = listFiles[0].split('.');
          const expire = Number(file[1]);

          if ((new Date()).getTime() >= expire) {
            await this.#clearAll(listFiles);

            return null;
          }

          const stream = fs.createReadStream(`${this.#dir}${listFiles[0]}`, {
            encoding: 'utf-8',
          });

          const bufs: Array<Buffer> = [];
          const buffer = await new Promise<Buffer>((resolve) => {
            stream.on('data', (d) => bufs.push(Buffer.from(d)));
            stream.on('end', () => {
              const buf = Buffer.concat(bufs);

              resolve(buf);
            });
          });

          return buffer;
        }

        return null;
      } catch (e) {
        return null;
      }
    }
}
