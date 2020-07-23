import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Exercise } from "../entities/Exercise";
import { User } from "../entities/User";
import { ExerciseResponse } from "./types/ExerciseResponse";
import { IExerciseResponse, INormalResponse } from "./types/Interfaces";
import { NormalResponse } from "./types/NormalResponse";

@Resolver()
export class ExerciseResolver {
  @Query(() => [Exercise])
  async exercises() {
    return await Exercise.find({ relations: ["records"] });
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

  @Query(() => ExerciseResponse)
  async getAllExerciseData(@Ctx() ctxUser: User): Promise<IExerciseResponse> {
    if (!ctxUser.id) throw new Error("Sorry, log in please.");
    try {
      const exercises = await Exercise.find({
        where: { userId: ctxUser.id },
        relations: ["records"]
      });
      return {
        ok: true,
        error: null,
        exercise: exercises
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        exercise: null
      };
    }
  }

  @Query(() => ExerciseResponse)
  async getBodyPartExerciseData(
    @Arg("bodyPart") bodyPart: string,
    @Ctx() ctxUser: User
  ): Promise<IExerciseResponse> {
    if (!ctxUser.id) throw new Error("Sorry, log in please.");
    try {
      const exercises = await Exercise.find({
        where: { userId: ctxUser.id, bodyPart },
        relations: ["records"]
      });
      if (!exercises) throw new Error("Sorry, exercise not found.");
      return {
        ok: true,
        error: null,
        exercise: exercises
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        exercise: null
      };
    }
  }
}
