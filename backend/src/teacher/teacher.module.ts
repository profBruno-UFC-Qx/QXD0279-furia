import { TeacherService } from "./teacher.service.ts";
import { TeacherController } from "./teacher.controller.ts";
import { TeacherRepository } from "./teacher.repository.ts";
import { createTeacherRouter } from "./teacher.router.ts";
import { userServiceInstance } from "../user/user.module.ts";
import { databaseInstance } from "../database/dataBase.ts";

const teacherRepository = new TeacherRepository(databaseInstance);
const teacherService = new TeacherService(
  userServiceInstance,
  teacherRepository,
  databaseInstance,
);
const teacherController = new TeacherController(teacherService);
const teacherRouter = createTeacherRouter(teacherController);

export { teacherRouter, teacherService, teacherRepository };
