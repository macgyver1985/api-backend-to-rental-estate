import { ICache, types as cacheTypes } from '@layer/application/interfaces/sockets/cache';
import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets/services';
import ResultOnDemandDTO from '@layer/application/models/common';
import { RealEstateDTO } from '@layer/application/models/realEstate';
import { IAppSettings, types as settingsTypes } from '@layer/crossCutting/appSettings/interfaces';
import ISettings from '@layer/settings/interfaces';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import 'reflect-metadata';

@injectable()
class ServiceToObtainRealEstate implements IServiceToObtainRealEstate {
  #urlService: string;

  #buffer: Buffer;

  #indexer: Array<number>;

  #cache: ICache;

  public constructor(
  @inject(settingsTypes.IAppSettings) settings: IAppSettings<ISettings>,
    @inject(cacheTypes.ICache) cache: ICache,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    this.#urlService = settings.configs()?.adapters.services.obtainRealEstate.endpoint;
    this.#cache = cache;
    this.#indexer = [];
  }

  public async obtainOnDemand(): Promise<IServiceToObtainRealEstate> {
    this.#buffer = await this.#cache?.obtain('All', 'ServiceToObtainRealEstate');

    if (!this.#buffer) {
      this.#buffer = await new Promise<Buffer>((resolve, reject) => {
        fetch(this.#urlService)
          .then((t) => resolve(t.buffer()))
          .catch((err) => reject(err));
      });

      await this.#cache?.register('All', 'ServiceToObtainRealEstate', this.#buffer);
    }

    if (this.#buffer && this.#buffer.length > 0) {
      const bufferIndexes = await this.#cache?.obtain('Indexes', 'ServiceToObtainRealEstate');

      if (bufferIndexes && bufferIndexes.length > 0) {
        this.#indexer = <Array<number>>JSON.parse(bufferIndexes.toString('utf-8'));

        return this;
      }

      this.#indexer.push(1);

      this.#buffer.forEach((v, i) => {
        if (`${this.#buffer[i - 1]} ${v} ${this.#buffer[i + 1]}` === '125 44 123') {
          this.#indexer.push(i + 1);
        }
      });

      await this.#cache?.register('Indexes', 'ServiceToObtainRealEstate', Buffer.from(JSON.stringify(this.#indexer)));
    }

    return this;
  }

  public async nextIndex(
    index?: number,
    range?: number,
  ): Promise<ResultOnDemandDTO<RealEstateDTO>> {
    if (!this.#buffer || this.#indexer.length === 0) {
      return null;
    }

    const currentIndex = index ?? 1;
    const rangeList = range ?? 10;
    const totalIndex = Math.trunc((this.#indexer.length + 1) / rangeList)
      + (((this.#indexer.length + 1) % rangeList) > 0 ? 1 : 0);

    const startIndex = (rangeList * currentIndex) - rangeList;
    const start = this.#indexer[startIndex];
    const endIndex = (rangeList * currentIndex);
    const end = (this.#indexer[endIndex] ?? (this.#buffer.length)) - 1;

    if (!start) {
      return null;
    }

    const nextIndex = currentIndex === totalIndex ? currentIndex : currentIndex + 1;
    const prevIndex = currentIndex === 1 ? currentIndex : currentIndex - 1;
    const hasNext = currentIndex < totalIndex;
    const hasPrev = currentIndex > 1;

    const list = await new Promise<Array<RealEstateDTO>>((resolve, reject) => {
      try {
        const strItems = `[${this.#buffer.toString('utf-8', start, end).replace(/(\r\n|\n|\r|\t)/gm, '')}]`
          .replace(/(]){2,}$/m, ']');
        const items = <Array<RealEstateDTO>>JSON.parse(strItems);

        resolve(items);
      } catch (e) {
        reject(e);
      }
    });

    return {
      totalIndex,
      currentIndex,
      nextIndex,
      prevIndex,
      hasNext,
      hasPrev,
      rangeList,
      list,
    };
  }
}

export default ServiceToObtainRealEstate;
