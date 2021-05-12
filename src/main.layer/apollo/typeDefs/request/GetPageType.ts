import GetPage from '@layer/presentations/viewModels/request';
import 'reflect-metadata';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class GetPageType implements GetPage {
  @Field({ nullable: false })
  public pageNumber: number;

  @Field({ nullable: false })
  public pageSize: number;
}
