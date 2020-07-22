import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { Workout } from "./Workout";

@Entity()
@ObjectType()
export class WorkoutItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => Workout)
  @ManyToOne((type) => Workout, (workout) => workout.items, {
    onDelete: "CASCADE"
  })
  workout: Workout;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => Number, { nullable: true })
  @Column()
  weight: number;

  @Field(() => Number, { nullable: true })
  @Column()
  set: number;

  @Field(() => Number, { nullable: true })
  @Column()
  time: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}