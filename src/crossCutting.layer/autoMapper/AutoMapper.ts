import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAutoMapper, IMapper } from './interfaces';
import Mapper from './Mapper';

@injectable()
export default class AutoMapper implements IAutoMapper {
  #mappers: Array<{
    identity: string[],
    mapper: IMapper<unknown, unknown>
  }>;

  public constructor() {
    this.#mappers = [];
  }

  public createMap<TSource, TDestination>(
    sourceType: symbol,
    destinationType: symbol,
  ): IMapper<TSource, TDestination> {
    const item = new Mapper<TSource, TDestination>();

    this.#mappers.push({
      identity: [sourceType.toString(), destinationType.toString()],
      mapper: item,
    });

    return item;
  }

  public map<TDestination>(source: unknown, destination: TDestination): TDestination {
    if (!source || !destination) {
      return destination;
    }

    const mapItem = this.#mappers
      .find((t) => t.identity[0] === (<unknown>Object.getPrototypeOf(source)).constructor.name
        && t.identity[1] === (<unknown>Object.getPrototypeOf(destination)).constructor.name);

    return <TDestination>mapItem.mapper
      .map(source, destination);
  }
}
