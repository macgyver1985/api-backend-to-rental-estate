export default interface IMapper<TSource, TDestination>{
  forMember (
    member: keyof TDestination,
    action: (source: TSource) => unknown
  ): IMapper<TSource, TDestination>;

  map (source: TSource, destination: TDestination): TDestination;
}
