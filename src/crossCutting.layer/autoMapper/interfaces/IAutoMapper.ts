import IMapper from './IMapper';

export default interface IAutoMapper {
  createMap<TSource, TDestination> (
    source: FunctionConstructor, destination: FunctionConstructor
  ): IMapper<TSource, TDestination>;

  map<TDestination> (source: unknown, destination: TDestination): TDestination;
}
