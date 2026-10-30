import { Router } from "express";
import { TeacherController } from "./teacher.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createTeacherRouter(teacherController: TeacherController) {
  const teacherRouter = Router();

  teacherRouter.get("/teacher", teacherController.findAll); // paginacao
  teacherRouter.get(
    "/teacher/dashboard",
    AutorizationMiddleware(["teacher", "admin"]),
    teacherController.getDashboard
  );
  teacherRouter.get("/teacher/:id", teacherController.findById);
  teacherRouter.get("/teacher/:id/profile", teacherController.findProfileById);
  teacherRouter.put(
    "/teacher/:id",
    AutorizationMiddleware(["admin"]),
    teacherController.update,
  );
  teacherRouter.delete(
    "/teacher/:id",
    AutorizationMiddleware(["admin"]),
    teacherController.delete,
  );

  return teacherRouter;
}
