import { Field, InputType } from "type-graphql";

@InputType()
export class RoutineItem {
  @Field(() => String)
  title: string;

  @Field(() => Number)
  weight: number;

  @Field(() => Number)
  set: number;
}
