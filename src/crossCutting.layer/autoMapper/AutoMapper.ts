import { injectable } from 'inversify';
import 'reflect-metadata';
import { IAutoMapper, IMapper } from './interfaces';
import Mapper from './Mapper';

@injectable()
export default class AutoMapper implements IAutoMapper {
  #mappers: Array<{
    identity: symbol[],
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
      identity: [sourceType, destinationType],
      mapper: item,
    });

    return item;
  }

  public mapper<TSource, TDestination>(
    sourceType: symbol,
    destinationType: symbol,
  ): IMapper<TSource, TDestination> {
    if (!sourceType || !destinationType) {
      return null;
    }

    const mapItem = this.#mappers
      .find((t) => t.identity[0] === sourceType && t.identity[1] === destinationType);

    return <IMapper<TSource, TDestination>>mapItem.mapper;
  }
}
