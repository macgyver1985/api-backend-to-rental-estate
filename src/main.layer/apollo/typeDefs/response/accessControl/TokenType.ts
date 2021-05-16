import { TokenModel } from '@layer/presentations/responses/accessControl';
import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType({ description: 'Modelo que representa a autorização de acesso.' })
export default class TokenType implements TokenModel {
  @Field({ nullable: true })
  authorization?: string;

  @Field(() => Int, { nullable: true })
  expiresIn?: number;
}
