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
export class Exercise extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.exercises, {
    onDelete: "CASCADE"
  })
  user: User;

  @Field(() => Number)
  @RelationId((exercise: Exercise) => exercise.user)
  @Column()
  userId: number;

  @Field(() => String)
  @Column()
  bodyPart: string;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => [Record], { nullable: true })
  @OneToMany((type) => Record, (record) => record.exercise, { nullable: true })
  records: Record[];

  @Field(() => Number, { nullable: true })
  @Column({ nullable: true })
  latestRecord: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
