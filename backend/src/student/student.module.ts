import { StudentRepository } from "./student.repository.ts";
import { StudentService } from "./student.service.ts";
import { AppDataSource } from "../database/data-source.ts";
import { userServiceInstance } from "../user/user.module.ts";

const studentRepository = new StudentRepository(AppDataSource);
const studentService = new StudentService(
  userServiceInstance,
  studentRepository,
);

export { studentService, studentRepository };
