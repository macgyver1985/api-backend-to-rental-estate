import { GetAuthorization } from '@layer/presentations/requests/accessControl';
import 'reflect-metadata';
import { Field, InputType } from 'type-graphql';

@InputType()
export default class GetAuthorizationType implements GetAuthorization {
  @Field({ nullable: false })
  public userName: string;

  @Field({ nullable: false })
  public password: string;
}
