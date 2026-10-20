import { StudentRepository } from "./student.repository.ts";
import { StudentService } from "./student.service.ts";
import { AppDataSource } from "../database/data-source.ts";
import { userService } from "../user/user.module.ts";

const studentRepository = new StudentRepository(AppDataSource);
const studentService = new StudentService(userService, studentRepository);

export { studentService, studentRepository };
