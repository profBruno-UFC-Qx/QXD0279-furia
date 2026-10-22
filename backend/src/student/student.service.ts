import { UserService } from "../user/user.service.ts";
import { StudentRepository } from "./student.repository.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";
import { DataBase } from "../database/dataBase.ts";

export class StudentService {
  constructor(
    private userService: UserService,
    private studentRepository: StudentRepository,
    private database: DataBase,
  ) {}

  async createStudent(studentData: CreateStudentDTO) {
    const { email, password, name, role } = studentData;

    return await this.database.$transaction(async (tx) => {
      const user = await this.userService.createUserInTransaction(
        {
          email,
          password,
          name,
          role,
        },
        tx,
      );

      return await this.studentRepository.createStudent(user, studentData, tx);
    });
  }
}
