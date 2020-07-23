import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Exercise } from "../entities/Exercise";
import { ExerciseRecord } from "../entities/ExerciseRecord";
import { User } from "../entities/User";
import { Workout } from "../entities/Workout";
import { WorkoutItem } from "../entities/WorkoutItem";
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
  @Query(() => [WorkoutItem])
  async workouitems() {
    return await WorkoutItem.find({ relations: ["workout"] });
  }

  @Query(() => WorkoutResponse)
  async getWorkoutData(@Ctx() ctxUser: User): Promise<IWorkoutResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const workouts = await Workout.find({
        where: { userId: ctxUser.id },
        relations: ["items"]
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
    @Arg("rating") rating: number,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    if (!ctxUser.id) throw new Error("Sorry, log in please.");
    const createWorkoutItems = async (workout) => {
      routineItems.map(async (item) => {
        const newWorkoutItem = WorkoutItem.create({
          workout,
          user: ctxUser,
          title: item.title,
          weight: item.weight,
          set: item.set,
          time: item.time
        });
        await newWorkoutItem.save();
      });
    };
    const createExerciseRecords = async (workout) => {
      routineItems.map(async (item) => {
        const exercise = await Exercise.findOne({
          where: { userId: ctxUser.id, title: item.title }
        });
        if (exercise) {
          const newExerciseRecord = ExerciseRecord.create({
            workout,
            user: ctxUser,
            exercise,
            weight: item.weight
          });
          await newExerciseRecord.save();
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
      await createWorkoutItems(newWorkout);
      await createExerciseRecords(newWorkout);
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
