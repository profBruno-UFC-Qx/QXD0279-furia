import { Conflict } from "../errors/errors.ts";
import { AppDataSource } from "../database/data-source.ts";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { UserService } from "../user/user.service.ts";
import { StudentRepository } from "./student.repository.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";
import bcrypt from "bcrypt";

export class StudentService {
  constructor(
    private userService: UserService,
    private studentRepository: StudentRepository,
  ) {}

  async createStudent(studentData: CreateStudentDTO) {
    const { email, password, name, role } = studentData;

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

      return await this.studentRepository.createStudentInTransaction(
        manager,
        savedUser,
        {
          ...studentData,
          password: passwordHash,
        },
      );
    });
  }
}
