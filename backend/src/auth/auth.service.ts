import { AuthRepository } from "./auth.repository.ts";
import { StudentDTO } from "./dto/student/student.dto.ts";
import { Conflict } from "../errors/errors.ts";
import { StudentResponseDTO } from "./dto/student/studentResponse.dto.ts";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.ts";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerStudent(
    student: StudentDTO,
  ): Promise<{ newStudent: StudentResponseDTO; token: string }> {
    const { password, email } = student;

    const alreadyExists = await this.authRepository.findByEmail(email);

    if (alreadyExists) {
      throw new Conflict();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    student.password = passwordHash;

    const createdStudent = await this.authRepository.create(student);

    const newStudent: StudentResponseDTO = {
      name: createdStudent.name,
      email: createdStudent.email,
      course: createdStudent.course,
      role: createdStudent.role,
    };

    const token = createToken({
      sub: createdStudent.id,
    });

    return {
      newStudent,
      token,
    };
  }

  async registerTeacher() {}

  async login() {}
}
