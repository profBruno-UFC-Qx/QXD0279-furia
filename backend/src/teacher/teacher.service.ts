import { Conflict, NotFoundError } from "../errors/errors.ts";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { UserService } from "../user/user.service.ts";
import { TeacherRegisterDTO } from "../auth/dto/register.teacher.dto.ts";
import { TeacherDTO } from "./dto/teacher.dto.ts";
import { TeacherRepository } from "./teacher.repository.ts";
import { AppDataSource } from "../database/data-source.ts";
import bcrypt from "bcrypt";

export class TeacherService {
  constructor(
    private userService: UserService,
    private teacherRepository: TeacherRepository,
  ) {}

  async createTeacher(teacherData: TeacherRegisterDTO) {
    const { email, password, name, role, disciplines } = teacherData;

    return await AppDataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(GenericUser);

      const existingUser = await userRepository.findOneBy({ email });
      
      if (existingUser) {
        throw new Conflict("E-mail ja cadastrado");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = userRepository.create({
        email,
        password: passwordHash,
        name,
        role,
      });

      const savedUser = await userRepository.save(user);

      return await this.teacherRepository.createTeacherInTransaction(
        manager,
        savedUser,
        {
          email,
          password: passwordHash,
          name,
          role,
          disciplines,
        },
      );
    });
  }

  async findAll() {
    return await this.teacherRepository.findAll();
  }

  async findById(id: number) {
    const teacher = await this.teacherRepository.findById(id);

    if (!teacher) {
      throw new NotFoundError("Professor nao encontrado");
    }

    return teacher;
  }

  async updateTeacher(id: number, teacherData: Partial<TeacherDTO>) {
    const teacher = await this.findById(id);

    if (!teacher.user) {
      throw new NotFoundError("Professor nao encontrado");
    }

    const updatedUser = await this.userService.updateUser(
      teacher.user.user_id,
      {
        ...(teacherData.name ? { name: teacherData.name } : {}),
        ...(teacherData.email ? { email: teacherData.email } : {}),
        ...(teacherData.password ? { password: teacherData.password } : {}),
        ...(teacherData.role ? { role: teacherData.role } : {}),
      },
    );

    if (!updatedUser) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    const safeUpdatedUser: GenericUser = updatedUser;

    const updatedTeacher = await this.teacherRepository.findById(id);
    if (!updatedTeacher) {
      throw new NotFoundError("Professor nao encontrado");
    }

    updatedTeacher.user = safeUpdatedUser;
    return updatedTeacher;
  }

  async deleteTeacher(id: number) {
    const teacher = await this.findById(id);

    if (!teacher.user) {
      throw new NotFoundError("Professor nao encontrado");
    }

    const userDeleted = await this.userService.deleteUser(teacher.user.user_id);

    if (!userDeleted) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    const deleted = await this.teacherRepository.deleteTeacher(id);

    if (!deleted) {
      throw new NotFoundError("Professor nao encontrado");
    }

    return deleted;
  }
}
