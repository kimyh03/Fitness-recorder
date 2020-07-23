import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Inbody } from "../entities/InBody";
import { User } from "../entities/User";
import { InbodyResponse } from "./types/InbodyResponse";
import { IInbodyResponse, INormalResponse } from "./types/Interfaces";
import { NormalResponse } from "./types/NormalResponse";

@Resolver()
export class InbodyResolver {
  @Query(() => [Inbody])
  async inbodies() {
    return await Inbody.find();
  }

  @Mutation(() => NormalResponse)
  async createInbodyData(
    @Arg("weight") weight: number,
    @Arg("fat") fat: number,
    @Arg("muscle") muscle: number,
    @Arg("bodyFatRate") bodyFatRate: number,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const newInbodyData = Inbody.create({
        weight,
        fat,
        muscle,
        bodyFatRate,
        user: ctxUser
      });
      await newInbodyData.save();
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
  async deleteInbodyData(
    @Arg("id") id: string,
    @Ctx() ctxUser: User
  ): Promise<INormalResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const existInbodyData = await Inbody.findOne({ where: { id } });
      if (!existInbodyData) throw new Error("Sorry, inbody data not found");
      if (String(ctxUser.id) !== String(existInbodyData.userId))
        throw new Error("Sorry, you don't have a permission");
      await existInbodyData.remove();
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

  @Query(() => InbodyResponse)
  async getInbodyData(@Ctx() ctxUser: User): Promise<IInbodyResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, log in please.");
      const inbodies = await Inbody.find({ where: { userId: ctxUser.id } });
      return {
        ok: true,
        error: null,
        inbody: inbodies
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        inbody: null
      };
    }
  }
}
