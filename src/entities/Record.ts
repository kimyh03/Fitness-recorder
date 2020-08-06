import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Exercise } from "./Exercise";
import { User } from "./User";
import { Workout } from "./Workout";

@Entity()
@ObjectType()
export class Record extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.records, {
    onDelete: "CASCADE"
  })
  user: User;

  @Field(() => Workout)
  @ManyToOne((type) => Workout, (workout) => workout.records, {
    onDelete: "CASCADE"
  })
  workout: Workout;

  @Field(() => Exercise)
  @ManyToOne((type) => Exercise, (exercise) => exercise.records, {
    onDelete: "CASCADE"
  })
  exercise: Exercise;

  @Field(() => String)
  @Column()
  weight: string;

  @Field(() => String)
  @Column()
  set: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
