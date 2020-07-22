import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Exercise } from "./Exercise ";
import { Workout } from "./Workout";

@Entity()
@ObjectType()
export class ExerciseRecord extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

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
  @CreateDateColumn()
  createdAt: string;
}