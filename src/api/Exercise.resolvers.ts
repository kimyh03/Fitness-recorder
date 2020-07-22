import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Exercise } from "../entities/Exercise ";
import { User } from "../entities/User";
import { INormalResponse } from "./types/Interfaces";
import { NormalResponse } from "./types/NormalResponse";

@Resolver()
export class ExerciseResolver {
  @Query(() => [Exercise])
  async exercises() {
    return await Exercise.find();
  }

  @Mutation(() => NormalResponse)
  async createExercise(
    @Arg("bodyPart") bodyPart: string,
    @Arg("title") title: string,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const newExercise = Exercise.create({
        user: ctxUser,
        bodyPart,
        title
      });
      await newExercise.save();
      return {
        ok: true,
        error: null
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }

  @Mutation(() => NormalResponse)
  async deleteExercise(
    @Arg("id") id: string,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const existExercise = await Exercise.findOne({ where: { id } });
      if (!existExercise) throw new Error("Sorry, exercise not found");
      if (String(ctxUser.id) !== String(existExercise.userId))
        throw new Error("Sorry, you don't have a permission");
      await existExercise.remove();
      return {
        ok: true,
        error: null
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }
}
