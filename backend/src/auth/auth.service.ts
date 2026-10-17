import { AuthRepository } from "./auth.repository.ts";
import { StudentDTO } from "./dto/student/student.dto.ts";
import { Conflict } from "../errors/errors.ts";
import { StudentResponseDTO } from "./dto/student/studentResponse.dto.ts";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerStudent(student: StudentDTO): Promise<StudentResponseDTO> {
    const { password, email } = student;

    const alreadyExists = await this.authRepository.findByEmail(email);

    if (alreadyExists) {
      throw new Conflict();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    student.password = passwordHash;

    const user = await this.authRepository.create(student);

    const userResponse: StudentResponseDTO = {
      name: user.name,
      email: user.email,
      course: user.course,
      role: user.role,
    };

    return userResponse;
  }

  async registerTeacher() {}

  async login() {}
}
