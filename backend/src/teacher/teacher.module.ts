import { AppDataSource } from "../database/data-source.ts";
import { TeacherService } from "./teacher.service.ts";
import { TeacherController } from "./teacher.controller.ts";
import { TeacherRepository } from "./teacher.repository.ts";
import { createTeacherRouter } from "./teacher.router.ts";
import { userServiceInstance } from "../user/user.module.ts";
import { diciplineRepositoryInstance } from "../dicipline/dicipline.module.ts";

const teacherRepository = new TeacherRepository(
  AppDataSource,
  diciplineRepositoryInstance,
);
const teacherService = new TeacherService(
  userServiceInstance,
  teacherRepository,
);
const teacherController = new TeacherController(teacherService);
const teacherRouter = createTeacherRouter(teacherController);

export { teacherRouter, teacherService, teacherRepository };
