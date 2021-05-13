import { RealEstateModel } from '@layer/presentations/viewModels/response/realEstate';
import 'reflect-metadata';
import {
  Field, Int, ObjectType,
} from 'type-graphql';
import AddressType from './AddressType';
import PricingInfosType from './PricingInfosType';

@ObjectType({ description: 'Modelo que representa uma imóvel.' })
export default class RealEstateType implements RealEstateModel {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field(() => Int, { nullable: true })
  usableAreas?: number;

  @Field({ nullable: true })
  listingType?: string;

  @Field({ nullable: true })
  listingStatus?: string;

  @Field(() => Int, { nullable: true })
  parkingSpaces?: number;

  @Field({ nullable: true })
  owner?: boolean;

  @Field(() => Int, { nullable: true })
  bathrooms?: number;

  @Field(() => Int, { nullable: true })
  bedrooms?: number;

  @Field(() => [String], { nullable: true })
  images?: Array<string>;

  @Field(() => AddressType, { nullable: true })
  address?: AddressType;

  @Field(() => PricingInfosType, { nullable: true })
  pricingInfos?: PricingInfosType;
}
