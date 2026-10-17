import { DataSource, Repository } from "typeorm";
import { Student } from "../database/entities/Student.ts";
import { StudentDTO } from "./dto/student/student.dto.ts";

export class AuthRepository {
  studentRepository: Repository<Student>;
  constructor(private database: DataSource) {
    this.studentRepository = this.database.getRepository(Student);
  }

  async findByEmail(email: string) {
    return await this.studentRepository.findOneBy({
      email: email,
    });
  }

  async create(student: StudentDTO) {
    const newStudent = this.studentRepository.create(student);
    return await this.studentRepository.save(newStudent);
  }
}
