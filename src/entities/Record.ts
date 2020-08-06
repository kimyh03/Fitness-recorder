import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn()
  exercise: Exercise;

  @Field(() => String)
  @Column()
  bodyPart: string;

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => Number)
  @Column()
  set: number;

  @Field(() => Number)
  @Column()
  year: number;

  @Field(() => Number)
  @Column()
  month: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
