import { DataSource, Repository } from "typeorm";
import { Student } from "../database/entities/Student.ts";

export class AuthRepository {
  studentRepository: Repository<Student>;
  constructor(private database: DataSource) {
    this.studentRepository = this.database.getRepository(Student);
  }
  async findByEmail(email: string) {}
}
