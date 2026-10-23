import { NotFoundError } from "../errors/errors.ts";
import { UserService } from "../user/user.service.ts";
import { StudentRepository } from "./student.repository.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";
import { DataBase } from "../database/dataBase.ts";
import { pagWrapper } from "../utils/pagWrapper.ts";

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

  async findAll(take: number, skip: number) {
    const total = await this.studentRepository.count();
    const data = await this.studentRepository.findAll(take, skip);
    return pagWrapper(data, take, skip, total);
  }

  async findById(id: number) {
    const student = await this.studentRepository.findById(id);

    if (!student) {
      throw new NotFoundError("Aluno nao encontrado");
    }

    return student;
  }

  async updateStudent(id: number, studentData: Partial<CreateStudentDTO>) {
    const student = await this.findById(id);

    if (!student.user) {
      throw new NotFoundError("Aluno nao encontrado");
    }

    const updatedUser = await this.userService.updateUser(
      student.user.user_id,
      {
        ...(studentData.name ? { name: studentData.name } : {}),
        ...(studentData.email ? { email: studentData.email } : {}),
        ...(studentData.password ? { password: studentData.password } : {}),
        ...(studentData.role ? { role: studentData.role } : {}),
      },
    );

    if (!updatedUser) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    const updatedStudent = await this.studentRepository.updateStudent(id, {
      ...(studentData.course ? { course: studentData.course } : {}),
    });

    if (!updatedStudent) {
      throw new NotFoundError("Aluno nao encontrado");
    }

    updatedStudent.user = updatedUser;
    return updatedStudent;
  }
}
