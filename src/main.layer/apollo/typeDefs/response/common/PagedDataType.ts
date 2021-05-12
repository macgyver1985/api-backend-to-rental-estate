import PagedDataModel from '@layer/presentations/viewModels/response/common';
import 'reflect-metadata';
import {
  Field, Int, ObjectType,
} from 'type-graphql';
import { RealEstateType } from '../realEstate';

@ObjectType({ description: 'Modelo de coleção de dados paginados.' })
export default class PagedDataType implements PagedDataModel<RealEstateType> {
  @Field(() => Int, { nullable: true })
  pageNumber?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;

  @Field(() => Int, { nullable: true })
  totalCount?: number;

  @Field(() => [RealEstateType], { nullable: true })
  listings?: Array<RealEstateType>;
}
