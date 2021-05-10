import { IMapper } from './interfaces';

export default class Mapper<TSource, TDestination> implements IMapper<TSource, TDestination> {
  #map: Array<{
    member: keyof TDestination,
    action: (source: TSource) => unknown
  }>;

  public constructor() {
    this.#map = [];
  }

  public forMember(
    member: keyof TDestination,
    action: (source: TSource) => unknown,
  ): IMapper<TSource, TDestination> {
    this.#map.push({
      member,
      action,
    });

    return this;
  }

  public map(source: TSource, destination: TDestination): TDestination {
    const propsSource = Object.keys(source);
    const propsDest = Object.keys(destination)
      .filter((t) => this.#map.find((c) => c.member === t) === undefined
        && propsSource.find((c) => c === t) !== undefined);
    const resultDest = destination;

    this.#map.forEach((t) => {
      resultDest[t.member] = <TDestination[keyof TDestination]>t.action(source);
    });

    propsDest.forEach((t) => {
      resultDest[t] = <TDestination[keyof TDestination]>source[t];
    });

    return resultDest;
  }
}
