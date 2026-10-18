import { DataSource, Repository } from "typeorm";
import { Student } from "../database/entities/Student.ts";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { StudentDTO } from "../student/dto/student.dto.ts";

export class AuthRepository {
  studentRepository: Repository<Student>;
  userRepository: Repository<GenericUser>;
  constructor(private database: DataSource) {
    this.studentRepository = this.database.getRepository(Student);
    this.userRepository = this.database.getRepository(GenericUser);
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async createStudent(studentData: StudentDTO): Promise<Student> {
    const user = this.userRepository.create({
      name: studentData.name,
      email: studentData.email,
      password: studentData.password,
      role: "student",
    });

    const savedUser = await this.userRepository.save(user);

    const student = this.studentRepository.create({
      course: studentData.course,
      user: savedUser,
    });

    return this.studentRepository.save(student);
  }
}
