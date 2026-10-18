import { UserTypeRoles } from "../enums/roles.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: UserTypeRoles;
      };
    }
  }
}

export {};
