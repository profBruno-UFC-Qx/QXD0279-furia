import { AuthRepository } from "./auth.repository.ts";
import { Conflict, UnauthorizedError } from "../errors/errors.ts";
import { UserResponse, UserResponseMapper } from "./dto/userResponse.dto.ts";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.ts";
import { LoginUserDTO } from "./dto/login.dto.ts";
import { StudentRegisterDTO } from "./dto/register.student.dto.ts";
import { use } from "marked";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerStudent(
    student: StudentRegisterDTO,
  ): Promise<{ userResponse: UserResponse; token: string }> {
    const { password, email } = student;

    const alreadyExists = await this.authRepository.findByEmail(email);

    if (alreadyExists) {
      throw new Conflict();
    }

    const passwordHash = await bcrypt.hash(password, 10);

    student.password = passwordHash;

    const createdStudent = await this.authRepository.createStudent(student);

    const userResponse = UserResponseMapper(createdStudent);

    const token = createToken({
      user_id: createdStudent.user.user_id,
      role: createdStudent.user.role,
    });

    return {
      userResponse,
      token,
    };
  }

  async registerTeacher() {}

  async login(payload: LoginUserDTO) {
    const { email, password } = payload;

    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const userResponse = UserResponseMapper(user);

    const token = createToken({
      user_id: user.user_id,
      role: user.role,
    });

    return {
      userResponse,
      token,
    };
  }
}
