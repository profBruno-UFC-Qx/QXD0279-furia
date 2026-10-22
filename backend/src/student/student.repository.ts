import { PrismaClient, User } from "@prisma/client";
import { CreateStudentDTO } from "./dto/student.dto.ts";

export class StudentRepository {
  constructor(private database: PrismaClient) {}

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
