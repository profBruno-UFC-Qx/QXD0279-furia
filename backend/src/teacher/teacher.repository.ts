import { User } from "../generated/prisma/client.ts";
import { TeacherDTO } from "./dto/teacher.dto.ts";
import { DataBase } from "../database/dataBase.ts";
import { filterTeacher } from "../@types/filterTeacher.type.ts";

export class TeacherRepository {
  constructor(private database: DataBase) {}

  private buildWhere(filter?: filterTeacher) {
    return {
      ...(filter?.search && {
        user: {
          name: {
            contains: filter.search,
            mode: "insensitive" as const,
          },
        },
      }),
      ...(filter?.discipline && {
        disciplines: {
          some: {
            name: {
              equals: filter.discipline,
              mode: "insensitive" as const,
            },
          },
        },
      }),
    };
  }

  async createTeacher(user: User, teacherData: TeacherDTO, tx?: any) {
    const prisma = tx ?? this.database;

    return await prisma.teacher.create({
      data: {
        user: {
          connect: { user_id: user.user_id },
        },
        disciplines: {
          connect: teacherData.disciplines.map((disciplineId) => ({
            discipline_id: disciplineId,
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
      where: this.buildWhere(filter),
      select: {
        teacher_id: true,
        creat_at: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        disciplines: {
          select: {
            discipline_id: true,
            name: true,
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

  async getDashboardInfo(userId: number) {
    return await this.database.teacher.findFirst({
      where: { 
        user: { user_id: userId } 
      },
      include: {
        user: true,
        disciplines: true,
        avaliacoes: {
          include: {
            student: { include: { user: true } },
            discipline: true,
          },
          orderBy: { creat_at: 'desc' },
        },
        documents: {
          orderBy: { data_publicacao: 'desc' },
          take: 5,
        }
      }
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

  async findProfileById(id: number) {
    return await this.database.teacher.findUnique({
      where: { teacher_id: id },
      include: {
        user: true,
        disciplines: true,
        avaliacoes: {
          include: {
            student: { include: { user: true } },
            discipline: true,
          },
          orderBy: { creat_at: 'desc' }
        },
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

  async count(filter?: filterTeacher) {
    return this.database.teacher.count({
      where: this.buildWhere(filter),
    });
  }
}