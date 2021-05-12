import { AddressModel } from '@layer/presentations/viewModels/response/realEstate';
import 'reflect-metadata';
import {
  Field, ObjectType,
} from 'type-graphql';
import GeoLocationType from './GeoLocationType';

@ObjectType({ description: 'Modelos que representa um endereço.' })
export default class AddressType implements AddressModel {
  @Field({ nullable: true })
  city?: string;

  @Field({ nullable: true })
  neighborhood?: string;

  @Field(() => GeoLocationType, { nullable: true })
  geoLocation?: GeoLocationType;
}
