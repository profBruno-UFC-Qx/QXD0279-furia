import { Router } from "express";
import { TeacherController } from "./teacher.controller.ts";

export function createTeacherRouter(teacherController: TeacherController) {
  const teacherRouter = Router();

  teacherRouter.get("/teacher", teacherController.findAll);
  teacherRouter.get("/teacher/:id", teacherController.findById);
  teacherRouter.put("/teacher/:id", teacherController.update);
  teacherRouter.delete("/teacher/:id", teacherController.delete);

  return teacherRouter;
}
