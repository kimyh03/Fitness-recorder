import { Exercise } from "../../entities/Exercise";
import { Inbody } from "../../entities/InBody";
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
}
