import { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";
import { RegisterUserSchema } from "./schema/register-user.schema.ts.ts";

export class AuthController {
  constructor(private authService: AuthService) {}
  login = async (req: Request, res: Response) => {};

  register = async (req: Request, res: Response) => {
    const isValid = RegisterUserSchema.safeParse(req.body);
  };
}
