import { GeoLocationModel } from '@layer/presentations/viewModels/response/realEstate';
import 'reflect-metadata';
import {
  Field, ObjectType,
} from 'type-graphql';
import LocationType from './LocationType';

@ObjectType({ description: 'Modelo que representa uma Geolocalização.' })
export default class GeoLocationType implements GeoLocationModel {
  @Field({ nullable: true })
  precision?: string;

  @Field(() => LocationType, { nullable: true })
  location?: LocationType;
}
