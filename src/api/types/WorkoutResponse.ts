import { Field, ObjectType } from "type-graphql";
import { Record } from "../../entities/Record";
import { Workout } from "../../entities/Workout";

@ObjectType()
export class WorkoutResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;

  @Field(() => [Workout], { nullable: true })
  workout: Workout[];

  @Field(() => [Record], { nullable: true })
  record: Record[];
}
