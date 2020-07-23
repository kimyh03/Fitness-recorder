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
export class ExerciseRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.exerciseRecords, {
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

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
