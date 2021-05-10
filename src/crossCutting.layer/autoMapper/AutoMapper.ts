import { IAutoMapper, IMapper } from './interfaces';
import Mapper from './Mapper';

export default class AutoMapper implements IAutoMapper {
  #mappers: Array<{
    identity: string[],
    mapper: IMapper<unknown, unknown>
  }>;

  public constructor() {
    this.#mappers = [];
  }

  public createMap<TSource, TDestination>(
    source: FunctionConstructor,
    destination: FunctionConstructor,
  ): IMapper<TSource, TDestination> {
    const item = new Mapper<TSource, TDestination>();

    this.#mappers.push({
      identity: [source.name, destination.name],
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
