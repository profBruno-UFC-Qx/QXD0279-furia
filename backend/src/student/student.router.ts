import { Router } from "express";
import { StudentController } from "./student.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createStudentRouter(studentController: StudentController) {
  const studentRouter = Router();

  studentRouter.get("/student", studentController.findAll);
  studentRouter.get("/student/:id", studentController.findById);
  studentRouter.put(
    "/student/:id",
    AutorizationMiddleware(["admin"]),
    studentController.update,
  );
  studentRouter.delete(
    "/student/:id",
    AutorizationMiddleware(["admin"]),
    studentController.delete,
  );

  return studentRouter;
}
