import { DataSource, EntityManager, Repository } from "typeorm";
import { Student } from "../database/entities/Student.ts";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";

export class StudentRepository {
  studentRepository: Repository<Student>;
  constructor(private database: DataSource) {
    this.studentRepository = this.database.getRepository(Student);
  }

  async createStudent(user: GenericUser, studentData: CreateStudentDTO) {
    const student = this.studentRepository.create({
      course: studentData.course,
      user: user,
    });

    return await this.studentRepository.save(student);
  }

  async createStudentInTransaction(
    manager: EntityManager,
    user: GenericUser,
    studentData: CreateStudentDTO,
  ) {
    const studentRepository = manager.getRepository(Student);

    const student = studentRepository.create({
      course: studentData.course,
      user,
    });

    return await studentRepository.save(student);
  }
}
