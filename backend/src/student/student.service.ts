import { UserService } from "../user/user.service.ts";
import { StudentRepository } from "./student.repository.ts";
import { StudentDTO } from "./dto/student.dto.ts";

export class StudentService {
  constructor(
    private userService: UserService,
    private studentRepository: StudentRepository,
  ) {}

  async registerStudent(studentData: StudentDTO) {
    const { email, password, name, role } = studentData;

    const simpleUser = {
      email,
      password,
      name,
      role,
    };

    const user = await this.userService.registerUser(simpleUser);
    const student = await this.studentRepository.createStudent(
      user,
      studentData,
    );

    return student;
  }
}
