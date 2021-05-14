import GetPage from '@layer/presentations/requests/common';
import 'reflect-metadata';
import { Field, Int, InputType } from 'type-graphql';

@InputType()
export default class GetPageType implements GetPage {
  @Field(() => Int, { nullable: false })
  public pageNumber: number;

  @Field(() => Int, { nullable: false })
  public pageSize: number;
}
