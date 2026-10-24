import { DataBase } from "../database/dataBase.ts";
import { AvaliacaoDTO } from "./dto/avaliacao.dto.ts";

export class AvaliacaoRepository {
  constructor(private database: DataBase) {}

  async createAvaliacao(avaliacaoData: AvaliacaoDTO) {
    return await this.database.avaliacao.create({
      data: avaliacaoData,
      include: {
        student: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        teacher: {
          include: {
            user: true,
          },
        },
        discipline: true,
      },
    });
  }

  async findMine(id: number, take: number, skip: number) {
    return await this.database.avaliacao.findMany({
      take,
      skip,
      where: {
        student_id: id,
      },
      omit: {
        id: true,
        nota_didatica: true,
        nota_metodologia: true,
        student_id: false,
        teacher_id: true,
        discipline_id: true,
      },
      include: {
        teacher: {
          omit: {
            teacher_id: true,
          },
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        discipline: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async countMine(id: number) {
    return await this.database.avaliacao.count({
      where: {
        student_id: id,
      },
    });
  }

  async findAll(take: number, skip: number) {
    return await this.database.avaliacao.findMany({
      take,
      skip,
      include: {
        student: {
          include: {
            user: true,
          },
        },
        teacher: {
          include: {
            user: true,
          },
        },
        discipline: true,
      },
    });
  }

  async findById(id: number) {
    return await this.database.avaliacao.findUnique({
      where: { id },
      include: {
        student: {
          include: {
            user: true,
          },
        },
        teacher: {
          include: {
            user: true,
          },
        },
        discipline: true,
      },
    });
  }

  async updateAvaliacao(id: number, avaliacaoData: Partial<AvaliacaoDTO>) {
    return await this.database.avaliacao.update({
      where: { id },
      data: avaliacaoData,
    });
  }

  async deleteAvaliacao(id: number) {
    try {
      await this.database.avaliacao.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async count() {
    return this.database.avaliacao.count();
  }
}
