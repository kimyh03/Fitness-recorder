import { Field, ObjectType } from "type-graphql";
import { Inbody } from "../../entities/InBody";

@ObjectType()
export class InbodyResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;

  @Field(() => [Inbody], { nullable: true })
  inbody: Inbody[];
}
