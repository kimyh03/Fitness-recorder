import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
@ObjectType()
export class WorkoutItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.workoutItems, {
    onDelete: "CASCADE"
  })
  user: User;

  @Field(() => Workout)
  @ManyToOne((type) => Workout, (workout) => workout.items, {
    onDelete: "CASCADE"
  })
  workout: Workout;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  weight: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  set: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
