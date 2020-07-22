import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ExerciseRecord } from "./ExerciseRecord";
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

  @Field(() => String)
  @Column()
  bodyPart: string;

  @Field(() => String)
  @Column({ unique: true })
  title: string;

  @Field(() => [ExerciseRecord], { nullable: true })
  @OneToMany(
    (type) => ExerciseRecord,
    (exerciseRecord) => exerciseRecord.exercise
  )
  records: ExerciseRecord[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
