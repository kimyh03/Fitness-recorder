import { Field, ObjectType } from "type-graphql";
import { Inbody } from "../../entities/InBody";
import { User } from "../../entities/User";

@ObjectType()
export class GetMeResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;

  @Field(() => User, { nullable: true })
  user: User;

  @Field(() => [Inbody], { nullable: true })
  latestInbodyData: Inbody[];
}
