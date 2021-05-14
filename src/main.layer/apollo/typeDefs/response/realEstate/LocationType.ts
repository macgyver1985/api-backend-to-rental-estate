import { LocationModel } from '@layer/presentations/responses/realEstate';
import 'reflect-metadata';
import {
  Field, Float, ObjectType,
} from 'type-graphql';

@ObjectType({ description: 'Modelo de dados que representa a latitude e longitude de uma localização.' })
export default class LocationType implements LocationModel {
  @Field(() => Float, { nullable: true })
  lon?: number;

  @Field(() => Float, { nullable: true })
  lat?: number;
}
