import PagedDataModel from '@layer/presentations/responses/common';
import 'reflect-metadata';
import {
  Field, Int, ObjectType,
} from 'type-graphql';
import { RealEstateType } from '../realEstate';

@ObjectType({ description: 'Modelo de dados que contem os imóveis paginados.' })
export default class PagedRealEstateType implements PagedDataModel<RealEstateType> {
  @Field(() => Int, { nullable: true })
  pageNumber?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;

  @Field(() => Int, { nullable: true })
  totalPages?: number;

  @Field(() => Int, { nullable: true })
  totalCount?: number;

  @Field(() => [RealEstateType], { nullable: true })
  listings?: Array<RealEstateType>;
}
