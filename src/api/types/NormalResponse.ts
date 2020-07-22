import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class NormalResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;
}
