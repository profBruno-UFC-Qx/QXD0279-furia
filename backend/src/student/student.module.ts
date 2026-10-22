import { StudentRepository } from "./student.repository.ts";
import { StudentService } from "./student.service.ts";
import { StudentController } from "./student.controller.ts";
import { createStudentRouter } from "./student.router.ts";
import { userServiceInstance } from "../user/user.module.ts";
import { databaseInstance } from "../database/dataBase.ts";

const studentRepository = new StudentRepository(databaseInstance);
const studentService = new StudentService(
  userServiceInstance,
  studentRepository,
  databaseInstance,
);
const studentController = new StudentController(studentService);
const studentRouter = createStudentRouter(studentController);

export { studentService, studentRepository, studentController, studentRouter };
