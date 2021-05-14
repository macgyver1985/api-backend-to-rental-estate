import { PricingInfosModel } from '@layer/presentations/responses/realEstate';
import 'reflect-metadata';
import {
  Field, Float, ObjectType,
} from 'type-graphql';

@ObjectType({ description: 'Modelo que representa uma Geolocalização.' })
export default class PricingInfosType implements PricingInfosModel {
  @Field({ nullable: true })
  period?: string;

  @Field(() => Float, { nullable: true })
  yearlyIptu?: number;

  @Field(() => Float, { nullable: true })
  price?: number;

  @Field({ nullable: true })
  businessType?: string;

  @Field(() => Float, { nullable: true })
  monthlyCondoFee?: number;

  @Field(() => Float, { nullable: true })
  rentalTotalPrice?: number;
}
