import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Inbody } from "../entities/InBody";
import { User } from "../entities/User";
import { comparePassword, encryptToHash } from "../utils/hashAuthentication";
import { createJWT } from "../utils/JWTAutentication";
import { GetMeResponse } from "./types/GetMEResponse";
import {
  IGetMeResponse,
  INormalResponse,
  ITokenResponse
} from "./types/Interfaces";
import { NormalResponse } from "./types/NormalResponse";
import { TokenResponse } from "./types/TokenResponse";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users() {
    return await User.find();
  }

  @Mutation(() => NormalResponse)
  async signUp(
    @Arg("email") email: string,
    @Arg("username") username: string,
    @Arg("password") password: string
  ): Promise<INormalResponse> {
    try {
      const hasedPassword = await encryptToHash(password);
      const newUser = User.create({
        email,
        username,
        password: hasedPassword
      });
      await newUser.save();
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
  async doubleCheckEmail(
    @Arg("email") email: string
  ): Promise<INormalResponse> {
    try {
      const existUser = await User.findOne({ where: { email } });
      if (existUser) {
        return {
          ok: false,
          error: "Sorry, you hava a account"
        };
      } else {
        return {
          ok: true,
          error: null
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message
      };
    }
  }

  @Mutation(() => TokenResponse)
  async signIn(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<ITokenResponse> {
    try {
      const existUser = await User.findOne({ where: { email } });
      if (!existUser) throw new Error("Sorry, user not found");
      const checkPassword = await comparePassword(password, existUser.password);
      if (checkPassword) {
        const token = await createJWT(existUser.id);
        return {
          ok: true,
          error: null,
          token
        };
      } else {
        return {
          ok: false,
          error: "Sorry, wrong password",
          token: null
        };
      }
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        token: null
      };
    }
  }

  @Query(() => GetMeResponse)
  async getMe(@Ctx() ctxUser: User): Promise<IGetMeResponse> {
    try {
      if (!ctxUser.id) throw new Error("Sorry, you don't have a permission.");
      const user = await User.findOne({
        where: { id: ctxUser.id },
        relations: ["exercises", "inbodies"]
      });
      if (!user) throw new Error("Sorry, user not found");
      const latestInbodyData = await Inbody.find({
        where: { user },
        take: 1,
        order: { id: "DESC" }
      });
      return {
        ok: true,
        error: null,
        user,
        latestInbodyData
      };
    } catch (error) {
      return {
        ok: false,
        error: error.message,
        user: null,
        latestInbodyData: null
      };
    }
  }
}
