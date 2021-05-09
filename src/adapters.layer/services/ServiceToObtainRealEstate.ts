import { IServiceToObtainRealEstate } from '@layer/application/interfaces/sockets';
import ResultOnDemandDTO from '@layer/application/models/common';
import { RealEstateDTO } from '@layer/application/models/realEstate';
import { injectable } from 'inversify';
import fetch from 'node-fetch';
import 'reflect-metadata';

@injectable()
class ServiceToObtainRealEstate implements IServiceToObtainRealEstate {
  #urlService = 'http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-2.json';

  #buffer: Buffer;

  #indexer: Array<number>;

  public constructor() {
    this.#indexer = [];
  }

  public async obtainOnDemand(): Promise<IServiceToObtainRealEstate> {
    this.#buffer = await new Promise<Buffer>((resolve, reject) => {
      fetch(this.#urlService)
        .then((t) => resolve(t.buffer()))
        .catch((err) => reject(err));
    });

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
    const totalIndex = Math.trunc((this.#indexer.length) / rangeList)
      + ((this.#indexer.length % range) > 0 ? 1 : 0);
    const nextIndex = currentIndex === totalIndex ? currentIndex : currentIndex + 1;
    const prevIndex = currentIndex === 1 ? currentIndex : currentIndex - 1;
    const hasNext = currentIndex !== totalIndex;
    const hasPrev = currentIndex !== 1;
    const start = this.#indexer[(rangeList * currentIndex) - rangeList] + 1;
    const end = this.#indexer[(rangeList * currentIndex)] ?? (this.#buffer.length - 2);

    const list = await new Promise<Array<RealEstateDTO>>((resolve, reject) => {
      try {
        const strItems = `[${this.#buffer.toString('utf-8', start, end)}]`;
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