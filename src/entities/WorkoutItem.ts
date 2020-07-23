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

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  weight: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  set: number;

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  time: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
