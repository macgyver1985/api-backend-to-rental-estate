import { ICache, types as cacheTypes } from '@layer/application/interfaces/sockets/cache';
import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets/services';
import ResultOnDemandDTO from '@layer/application/models/common';
import { RealEstateDTO } from '@layer/application/models/realEstate';
import { inject, injectable } from 'inversify';
import fetch from 'node-fetch';
import 'reflect-metadata';

@injectable()
class ServiceToObtainRealEstate implements IServiceToObtainRealEstate {
  #urlService = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-2.json';

  #buffer: Buffer;

  #indexer: Array<number>;

  #cache: ICache;

  public constructor(
  @inject(cacheTypes.ICache) cache: ICache,
  ) {
    this.#cache = cache;
    this.#indexer = [];
  }

  public async obtainOnDemand(): Promise<IServiceToObtainRealEstate> {
    this.#buffer = await this.#cache.obtain('All', 'ServiceToObtainRealEstate');

    if (!this.#buffer) {
      this.#buffer = await new Promise<Buffer>((resolve, reject) => {
        fetch(this.#urlService)
          .then((t) => resolve(t.buffer()))
          .catch((err) => reject(err));
      });

      await this.#cache.register('All', 'ServiceToObtainRealEstate', this.#buffer);
    }

    if (this.#buffer && this.#buffer.length > 0) {
      try {
        this.#buffer.forEach((v, i) => {
          if (`${this.#buffer[i - 1]} ${v} ${this.#buffer[i + 1]}` === '125 44 123') {
            this.#indexer.push(i);
          }
        });
      } catch (e) {
        throw new Error(e);
      }
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
    const totalIndex = Math.trunc((this.#indexer.length + 2) / rangeList)
      + (((this.#indexer.length + 2) % rangeList) > 0 ? 1 : 0);
    const nextIndex = currentIndex === totalIndex ? currentIndex : currentIndex + 1;
    const prevIndex = currentIndex === 1 ? currentIndex : currentIndex - 1;
    const hasNext = currentIndex !== totalIndex;
    const hasPrev = currentIndex !== 1;
    const start = (this.#indexer[(rangeList * currentIndex) - rangeList - 1] ?? 0) + 1;
    const end = this.#indexer[(rangeList * currentIndex) - 1] ?? (this.#buffer.length - 1);

    const list = await new Promise<Array<RealEstateDTO>>((resolve, reject) => {
      try {
        const strItems = `[${this.#buffer.toString('utf-8', start, end).replace(/[\\r\\n\\t]/gm, '')}]`;
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
