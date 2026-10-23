import { DataBase } from "../database/dataBase.ts";
import { CreateStudentDTO } from "./dto/student.dto.ts";
import { User } from "@prisma/client";

export class StudentRepository {
  constructor(private database: DataBase) {}

  async createStudent(user: User, studentData: CreateStudentDTO, tx?: any) {
    const prisma = tx ?? this.database;

    return await prisma.student.create({
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

  async findAll(take: number, skip: number) {
    return await this.database.student.findMany({
      take,
      skip,
      include: {
        user: true,
      },
    });
  }

  async findById(id: number) {
    return await this.database.student.findUnique({
      where: { student_id: id },
      include: {
        user: true,
      },
    });
  }

  async updateStudent(id: number, studentData: Partial<CreateStudentDTO>) {
    return await this.database.student.update({
      where: { student_id: id },
      data: {
        ...(studentData.course ? { course: studentData.course } : {}),
      },
      include: {
        user: true,
      },
    });
  }

  async deleteStudent(id: number) {
    try {
      await this.database.student.delete({
        where: { student_id: id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async count() {
    return this.database.student.count();
  }
}
