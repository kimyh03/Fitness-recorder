import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import { ExerciseRecord } from "./ExerciseRecord";
import { User } from "./User";
import { WorkoutItem } from "./WorkoutItem";

@Entity()
@ObjectType()
export class Workout extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.workouts, {
    onDelete: "CASCADE"
  })
  user: User;

  @Field(() => Number)
  @RelationId((workout: Workout) => workout.user)
  userId: number;

  @Field(() => [WorkoutItem])
  @OneToMany((type) => WorkoutItem, (workoutItem) => workoutItem.workout)
  items: WorkoutItem[];

  @Field(() => String, { nullable: true })
  @Column()
  review: string;

  @Field(() => Number)
  @Column()
  rating: number;

  @Field(() => [ExerciseRecord])
  @OneToMany(
    (type) => ExerciseRecord,
    (exerciseRecord) => exerciseRecord.workout
  )
  records: ExerciseRecord[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
