import { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";
import { RegisterUserSchema } from "./schema/register-user.schema.ts.ts";
import { BadRequestError } from "../errors/errors.ts";
import { isStudent } from "./verifies/student.verify.ts";

export class AuthController {
  constructor(private authService: AuthService) {}
  login = async (req: Request, res: Response) => {};

  register = async (req: Request, res: Response) => {
    const isValidUser = RegisterUserSchema.safeParse(req.body);

    if (!isValidUser.success) {
      throw new BadRequestError("Invalid body format.", isValidUser.error);
    }

    if (isValidUser.data.role == "student") {
      isStudent(req.body);

      console.log("estudante");
    } else if (isValidUser.data.role == "teacher") {
      console.log("prof");
    }

    return res.status(201).json({});
  };
}
