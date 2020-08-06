import { Field, ObjectType } from "type-graphql";
import { Inbody } from "../../entities/InBody";
import { Record } from "../../entities/Record";
import { User } from "../../entities/User";
import { Workout } from "../../entities/Workout";

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

  @Field(() => [Workout], { nullable: true })
  recentWorkouts: Workout[];

  @Field(() => [Record], { nullable: true })
  recentRecords: Record;
}
