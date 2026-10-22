import { createAuthRouter } from "./auth.router.ts";
import { AuthController } from "./auth.controller.ts";
import { AuthService } from "./auth.service.ts";
import { studentService } from "../student/student.module.ts";
import { teacherService } from "../teacher/teacher.module.ts";
import { userServiceInstance } from "../user/user.module.ts";

const authService = new AuthService(
  studentService,
  teacherService,
  userServiceInstance,
);
const authController = new AuthController(authService);
const authRouter = createAuthRouter(authController);

export { authRouter };
