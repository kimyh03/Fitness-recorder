import { Field, ObjectType } from "type-graphql";
import { Exercise } from "../../entities/Exercise";

@ObjectType()
export class ExerciseResponse {
  @Field(() => Boolean)
  ok: boolean;

  @Field(() => String, { nullable: true })
  error: string;

  @Field(() => [Exercise], { nullable: true })
  exercise: Exercise[];
}
