import PagedDataModel from '@layer/presentations/viewModels/response/common';
import 'reflect-metadata';
import {
  Field, Int, ObjectType,
} from 'type-graphql';

@ObjectType({ description: 'Modelo de coleção de dados paginados.' })
export default class PagedDataType<T> implements PagedDataModel<T> {
  @Field(() => Int, { nullable: true })
  pageNumber?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;

  @Field(() => Int, { nullable: true })
  totalCount?: number;

  @Field(() => Array, { nullable: true })
  listings?: Array<T>;
}
