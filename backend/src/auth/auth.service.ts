import { UnauthorizedError, NotFoundError } from "../errors/errors.ts";
import { UserResponse } from "./dto/userResponse.dto.ts";
import bcrypt from "bcrypt";
import { createToken } from "../utils/createToken.ts";
import { LoginUserDTO } from "./dto/login.dto.ts";
import { StudentRegisterDTO } from "./dto/register.student.dto.ts";
import { StudentService } from "../student/student.service.ts";
import { UserService } from "../user/user.service.ts";
import { TeacherService } from "../teacher/teacher.service.ts";
import { TeacherRegisterDTO } from "./dto/register.teacher.dto.ts";
export class AuthService {
  constructor(
    private studentService: StudentService,
    private teacherService: TeacherService,
    private userService: UserService,
  ) {}

  async registerStudent(
    studentData: StudentRegisterDTO,
  ): Promise<{ userResponse: UserResponse; token: string }> {
    const student = await this.studentService.createStudent(studentData);

    const token = createToken({
      user_id: student.user.user_id,
      role: "student",
    });

    return {
      userResponse: { name: student.user.name, role: "student" },
      token,
    };
  }

  async registerTeacher(
    teacherData: TeacherRegisterDTO,
  ): Promise<{ userResponse: UserResponse; token: string }> {
    const teacher = await this.teacherService.createTeacher(teacherData);
    const teacherUser = teacher.user;

    if (!teacherUser) {
      throw new NotFoundError("Professor nao encontrado");
    }

    const token = createToken({
      user_id: teacherUser.user_id,
      role: "teacher",
    });

    return {
      userResponse: { name: teacherUser.name, role: "teacher" },
      token,
    };
  }

  async login(
    payload: LoginUserDTO,
  ): Promise<{ userResponse: UserResponse; token: string }> {
    const { email, password } = payload;

    const user = await this.userService.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedError("Credenciais invalidas");
    }

    const token = createToken({
      user_id: user.user_id,
      role: user.role,
    });

    return {
      userResponse: { name: user.name, role: user.role },
      token,
    };
  }
}
