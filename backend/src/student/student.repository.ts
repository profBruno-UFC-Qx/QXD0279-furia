import { DataSource, Repository } from "typeorm";
import { Student } from "../database/entities/Student.ts";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { StudentDTO } from "./dto/student.dto.ts";

export class StudentRepository {
  studentRepository: Repository<Student>;
  constructor(private database: DataSource) {
    this.studentRepository = this.database.getRepository(Student);
  }

  async createStudent(user: GenericUser, studentData: StudentDTO) {
    const student = this.studentRepository.create({
      course: studentData.course,
      user: user,
    });

    return await this.studentRepository.save(student);
  }
}
