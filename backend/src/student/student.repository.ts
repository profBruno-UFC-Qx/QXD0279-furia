import { DataBase } from "../database/dataBase.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";
import { User } from "@prisma/client";

export class StudentRepository {
  constructor(private database: DataBase) {}

  async createStudent(user: User, studentData: CreateStudentDTO) {
    return await this.database.student.create({
      data: {
        course: studentData.course,
        user: {
          connect: { user_id: user.user_id },
        },
      },
      include: {
        user: true,
      },
    });
  }
}
