import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/errors.ts";
import { UserTypeRoles } from "../enums/roles.ts";

export function AutorizationMiddleware(allowed: Array<UserTypeRoles>) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!allowed) {
      next();
    }

    if (!req.user) {
      throw new UnauthorizedError();
    }

    if (!allowed.includes(req.user.role)) {
      throw new UnauthorizedError();
    }

    next();
  };
}
