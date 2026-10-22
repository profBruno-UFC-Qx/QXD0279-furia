import { StudentRepository } from "./student.repository.ts";
import { StudentService } from "./student.service.ts";
import { userServiceInstance } from "../user/user.module.ts";
import { databaseInstance } from "../database/dataBase.ts";

const studentRepository = new StudentRepository(databaseInstance);
const studentService = new StudentService(
  userServiceInstance,
  studentRepository,
);

export { studentService, studentRepository };
