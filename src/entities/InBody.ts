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
  userId: number;

  @Field(() => Number)
  @Column()
  weight: number;

  @Field(() => Number)
  @Column()
  fat: number;

  @Field(() => Number)
  @Column()
  muscle: number;

  @Field(() => Number)
  @Column()
  bodyFatRate: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: string;
}
