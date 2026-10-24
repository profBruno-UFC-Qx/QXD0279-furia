import { User } from "../generated/prisma/client.ts";
import { TeacherDTO } from "./dto/teacher.dto.ts";
import { DataBase } from "../database/dataBase.ts";

export class TeacherRepository {
  constructor(private database: DataBase) {}

  async createTeacher(user: User, teacherData: TeacherDTO, tx?: any) {
    const prisma = tx ?? this.database;

    return await prisma.teacher.create({
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

  async findAll(take: number, skip: number) {
    return await this.database.teacher.findMany({
      take,
      skip,
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
      await this.database.user.delete({
        where: { user_id: id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async count() {
    return this.database.teacher.count();
  }
}
