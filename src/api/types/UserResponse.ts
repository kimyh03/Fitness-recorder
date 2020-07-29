import { Field, ObjectType } from "type-graphql";
import { User } from "../../entities/User";

@ObjectType()
export class UserResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;

  @Field(() => User, { nullable: true })
  user: User;
}
