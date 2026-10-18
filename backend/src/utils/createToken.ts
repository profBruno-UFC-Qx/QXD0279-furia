import jwt from "jsonwebtoken";
import { Payload } from "../@types/payload.type.ts";

export function createToken(payload: Payload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "60m",
  });
}
