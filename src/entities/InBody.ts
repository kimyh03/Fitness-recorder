import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId
} from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Inbody extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: string;

  @Field(() => User)
  @ManyToOne((type) => User, (user) => user.inbodies, {
    onDelete: "CASCADE"
  })
  user: User;

  @Field(() => Number)
  @RelationId((inbody: Inbody) => inbody.user)
  @Column()
  userId: number;

  @Field(() => String)
  @Column()
  weight: string;

  @Field(() => String)
  @Column()
  fat: string;

  @Field(() => String)
  @Column()
  muscle: string;

  @Field(() => String)
  @Column()
  bodyFatRate: string;

  @Field(() => String)
  @Column()
  recordDate: string;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
