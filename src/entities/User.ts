import { IsEmail } from "class-validator";
import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { Exercise } from "./Exercise";
import { ExerciseRecord } from "./ExerciseRecord";
import { Inbody } from "./InBody";
import { Workout } from "./Workout";
import { WorkoutItem } from "./WorkoutItem";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => String)
  @Column()
  username: string;

  @Field(() => String)
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Field(() => String)
  @Column()
  password: string;

  @Field(() => [Exercise], { nullable: true })
  @OneToMany((type) => Exercise, (exercise) => exercise.user)
  exercises: Exercise[];

  @Field(() => [ExerciseRecord], { nullable: true })
  @OneToMany((type) => ExerciseRecord, (exerciseRecord) => exerciseRecord.user)
  exerciseRecords: ExerciseRecord[];

  @Field(() => [Workout], { nullable: true })
  @OneToMany((type) => Workout, (workout) => workout.user)
  workouts: Workout[];

  @Field(() => [WorkoutItem], { nullable: true })
  @OneToMany((type) => WorkoutItem, (workoutItem) => workoutItem.user)
  workoutItems: WorkoutItem[];

  @Field(() => [Inbody], { nullable: true })
  @OneToMany((type) => Inbody, (inbody) => inbody.user)
  inbodies: Inbody[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
