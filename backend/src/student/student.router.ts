import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/auth.middleware.ts";
import { StudentController } from "./student.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createStudentRouter(studentController: StudentController) {
  const studentRouter = Router();

  studentRouter.get("/student", AuthMiddleware, studentController.findAll);
  studentRouter.get("/student/:id", AuthMiddleware, studentController.findById);
  studentRouter.put(
    "/student/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    studentController.update,
  );
  studentRouter.delete(
    "/student/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    studentController.delete,
  );

  return studentRouter;
}
