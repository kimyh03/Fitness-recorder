import { Exercise } from "../../entities/Exercise";
import { Inbody } from "../../entities/InBody";
import { Record } from "../../entities/Record";
import { User } from "../../entities/User";
import { Workout } from "../../entities/Workout";

export interface INormalResponse {
  ok: boolean;
  error: string | null;
}

export interface ITokenResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface IExerciseResponse {
  ok: boolean;
  error: string | null;
  exercise: Exercise[] | null;
}

export interface IInbodyResponse {
  ok: boolean;
  error: string | null;
  inbody: Inbody[] | null;
}

export interface IWorkoutResponse {
  ok: boolean;
  error: string | null;
  workout: Workout[] | null;
  reocrd?: Record[] | null;
}

export interface IUserResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
}

export interface IGetMeResponse {
  ok: boolean;
  error: string | null;
  user: User | null;
  latestInbodyData: Inbody[] | null;
  recentWorkouts: Workout[] | null;
  recentRecords: Record[] | null;
}
