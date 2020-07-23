import { Field, InputType } from "type-graphql";

@InputType()
export class RoutineItem {
  @Field(() => String)
  title: string;

  @Field(() => Number, { nullable: true })
  weight?: number;

  @Field(() => Number, { nullable: true })
  set?: number;

  @Field(() => Number, { nullable: true })
  time?: number;
}
