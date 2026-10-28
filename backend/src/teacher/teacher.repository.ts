import { User } from "../generated/prisma/client.ts";
import { TeacherDTO } from "./dto/teacher.dto.ts";
import { DataBase } from "../database/dataBase.ts";
import { filterTeacher } from "../@types/filterTeacher.type.ts";

export class TeacherRepository {
  constructor(private database: DataBase) { }

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

  async findAll(take: number, skip: number, filter: filterTeacher) {
    return await this.database.teacher.findMany({
      take,
      skip,
      select: {
        teacher_id: true,
        creat_at: true,
        user: {
          select: {
            user_id: true,
            name: true,
            email: true,
          },
        },
        disciplines: true,
      where: {
        ...(filter.search && {
          user: {
            name: {
              contains: filter.search,
              mode: "insensitive",
            },
          },
        }),

        ...(filter.discipline && {
          disciplines: {
            some: {
              name: {
                equals: filter.discipline,
                mode: "insensitive",
              },
            },
          },
        }),
      },
      include: {
        teacher_id: false,
        user: {
          omit: {
            user_id: true,
            password: true,
            role: true,
          },
        },
        disciplines: {
          omit: {
            discipline_id: true,
            hours: true,
            course: true,
          },
        },
        avaliacoes: {
          select: {
            nota_geral: true,
            nota_didatica: true,
            nota_metodologia: true,
          },
        },
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
