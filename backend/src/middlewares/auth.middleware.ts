import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError, AppError } from "../errors/errors.ts";
import { Payload } from "../@types/payload.type.ts";

export const AuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const bearToken = req.headers.authorization;


  if (!bearToken) {
    throw new UnauthorizedError("Authorization header missing");
  }

  const [type, token] = bearToken.split(" ");

  if (type != "Bearer" || !token) {
    throw new UnauthorizedError("Invalid authorization format");
  }

  if (!process.env.JWT_SECRET) {
    throw new UnauthorizedError("JWT secret is not configured");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as Payload;
    console.log(decoded);
    req.user = { id: decoded.user_id, role: "student" };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new UnauthorizedError("Expired token");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      throw new UnauthorizedError("Invalid token format");
    }

    throw new UnauthorizedError("Something went wrong with the token");
  }

  next();
};
