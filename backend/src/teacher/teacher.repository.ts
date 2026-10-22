import { PrismaClient, User } from "@prisma/client";
import { TeacherDTO } from "./dto/teacher.dto.ts";

export class TeacherRepository {
  constructor(private database: PrismaClient) {}

  async createTeacher(user: User, teacherData: TeacherDTO) {
    return await this.database.teacher.create({
      data: {
        user: {
          connect: { user_id: user.user_id },
        },
        disciplines: {
          connect: teacherData.disciplines.map((disciplineId) => ({
            dicipline_id: disciplineId,
          })),
        },
      },
      include: {
        user: true,
        disciplines: true,
      },
    });
  }

  async findAll() {
    return await this.database.teacher.findMany({
      include: {
        user: true,
        disciplines: true,
      },
    });
  }

  async findById(id: number) {
    return await this.database.teacher.findUnique({
      where: { teacher_id: id },
      include: {
        user: true,
        disciplines: true,
      },
    });
  }

  async deleteTeacher(id: number) {
    try {
      await this.database.teacher.delete({
        where: { teacher_id: id },
      });
      return true;
    } catch {
      return false;
    }
  }
}
