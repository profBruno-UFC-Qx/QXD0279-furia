import { createAuthRouter } from "./auth.router.ts";
import { AuthController } from "./auth.controller.ts";
import { AuthService } from "./auth.service.ts";
import { AuthRepository } from "./auth.repository.ts";
import { AppDataSource } from "../database/data-source.ts";
import { studentService } from "../student/student.module.ts";
import { userServiceInstance } from "../user/user.module.ts";

const authService = new AuthService(studentService, userServiceInstance);
const authController = new AuthController(authService);
const authRouter = createAuthRouter(authController);

export { authRouter };
