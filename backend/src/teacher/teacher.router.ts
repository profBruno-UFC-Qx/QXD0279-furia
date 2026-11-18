import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/auth.middleware.ts";
import { TeacherController } from "./teacher.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createTeacherRouter(teacherController: TeacherController) {
  const teacherRouter = Router();

  teacherRouter.get("/teacher", AuthMiddleware, teacherController.findAll);
  teacherRouter.put(
    "/teacher/disciplines",
    AuthMiddleware,
    AutorizationMiddleware(["teacher", "admin"]),
    teacherController.updateDisciplines,
  );
  teacherRouter.get(
    "/teacher/dashboard",
    AuthMiddleware,
    AutorizationMiddleware(["teacher", "admin"]),
    teacherController.getDashboard,
  );
  teacherRouter.get("/teacher/:id", AuthMiddleware, teacherController.findById);
  teacherRouter.get(
    "/teacher/:id/profile",
    AuthMiddleware,
    teacherController.findProfileById,
  );
  teacherRouter.put(
    "/teacher/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    teacherController.update,
  );
  teacherRouter.delete(
    "/teacher/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    teacherController.delete,
  );

  return teacherRouter;
}
