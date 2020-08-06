import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Exercise } from "../entities/Exercise";
import { Record } from "../entities/Record";
import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { INormalResponse, IWorkoutResponse } from "./types/Interfaces";
import { NormalResponse } from "./types/NormalResponse";
import { RoutineItem } from "./types/RoutineItem";
import { WorkoutResponse } from "./types/WorkoutResponse";

@Resolver()
export class WorkoutResolver {
  @Query(() => [Workout])
  async workouts() {
    return await Workout.find({ relations: ["items", "records"] });
  }

  @Query(() => WorkoutResponse)
  async getWorkoutData(@Ctx() ctxUser: User): Promise<IWorkoutResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const workouts = await Workout.find({
        where: { userId: ctxUser.id },
        relations: ["recods"]
      });
      return {
        ok: true,
        error: null,
        workout: workouts
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        workout: null
      };
    }
  }

  @Mutation(() => NormalResponse)
  async createWorkout(
    @Arg("routineItems", (type) => [RoutineItem]) routineItems: RoutineItem[],
    @Arg("review") review: string,
    @Arg("rating") rating: string,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    if (!ctxUser.id) throw new Error("Sorry, log in please.");
    const createRecords = async (workout) => {
      routineItems.map(async (item) => {
        const exercise = await Exercise.findOne({
          where: { userId: ctxUser.id, title: item.title }
        });
        if (exercise) {
          const newRecord = Record.create({
            workout,
            user: ctxUser,
            exercise,
            weight: item.weight
          });
          await newRecord.save();
          exercise.latestRecord = item.weight;
          await exercise.save();
        }
      });
    };
    try {
      const newWorkout = Workout.create({
        user: ctxUser,
        review,
        rating
      });
      await newWorkout.save();
      await createRecords(newWorkout);
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
  async deleteWorkout(
    @Arg("id") id: string,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const existWorkout = await Workout.findOne({ where: { id } });
      if (!existWorkout) throw new Error("Sorry, exercise not found");
      if (String(ctxUser.id) !== String(existWorkout.userId))
        throw new Error("Sorry, you don't have a permission");
      await existWorkout.remove();
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
