import { Request, Response } from "express";
import { AuthService } from "./auth.service.ts";
import { RegisterUserSchema } from "./schema/register-user.schema.ts.ts";
import { BadRequestError, AppError } from "../errors/errors.ts";
import { isStudent } from "./verifies/student.verify.ts";
import { LoginUserSchema } from "./schema/login.schema.ts.ts";

export class AuthController {
  constructor(private authService: AuthService) {}
  login = async (req: Request, res: Response) => {
    const isValidUser = LoginUserSchema.safeParse(req.body);

    if (!isValidUser.success) {
      throw new BadRequestError(
        "E-mail ou senha mal formatados",
        isValidUser.error,
      );
    }

    const result = await this.authService.login(isValidUser.data);

    return res.status(200).json(result);
  };

  register = async (req: Request, res: Response) => {
    const isValidUser = RegisterUserSchema.safeParse(req.body);

    if (!isValidUser.success) {
      throw new BadRequestError(
        "Dados de cadastro mal formatados",
        isValidUser.error,
      );
    }

    if (isValidUser.data.role == "student") {
      const student = isStudent(req.body);

      const response = await this.authService.registerStudent(student);
      return res.status(201).json(response);
    } else if (isValidUser.data.role == "teacher") {
      console.log("prof");
    }

    return res.status(500).json({});
  };
}
