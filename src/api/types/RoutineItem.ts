import { Field, InputType } from "type-graphql";

@InputType()
export class RoutineItem {
  @Field(() => String)
  title: string;

  @Field(() => String)
  weight: string;

  @Field(() => String)
  set: string;
}
