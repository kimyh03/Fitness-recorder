import jwt from "jsonwebtoken";
import { User } from "../entities/User";

export const createJWT = async (id: string) => {
  const token = await jwt.sign(
    {
      id
    },
    process.env.JWT_TOKEN || ""
  );
  return token;
};

export const decodeJWT = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN || "");
    const { id } = decoded;
    const user = await User.findOne({ id });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
