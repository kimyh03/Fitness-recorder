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
import { Record } from "./Record";
import { User } from "./User";

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

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  review: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  rating: string;

  @Field(() => [Record])
  @OneToMany((type) => Record, (record) => record.workout)
  records: Record[];

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
