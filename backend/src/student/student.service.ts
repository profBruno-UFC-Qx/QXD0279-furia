import { UserService } from "../user/user.service.ts";
import { StudentRepository } from "./student.repository.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";

export class StudentService {
  constructor(
    private userService: UserService,
    private studentRepository: StudentRepository,
  ) {}

  async createStudent(studentData: CreateStudentDTO) {
    const { email, password, name, role } = studentData;

    const user = await this.userService.createUser({
      email,
      password,
      name,
      role,
    });

    return await this.studentRepository.createStudent(user, studentData);
  }
}
