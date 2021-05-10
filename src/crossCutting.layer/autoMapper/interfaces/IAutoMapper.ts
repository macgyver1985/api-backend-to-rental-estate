import IMapper from './IMapper';

export default interface IAutoMapper {
  createMap<TSource, TDestination> (
    sourceType: symbol, destinationType: symbol
  ): IMapper<TSource, TDestination>;

  mapper<TSource, TDestination> (
    sourceType: symbol,
    destinationType: symbol
  ): IMapper<TSource, TDestination>;
}
