import { DataBase } from "../database/dataBase.ts";
import { AvaliacaoDTO } from "./dto/avaliacao.dto.ts";

export class AvaliacaoRepository {
  constructor(private database: DataBase) {}

  async createAvaliacao(avaliacaoData: AvaliacaoDTO) {
    return await this.database.avaliacao.create({
      data: avaliacaoData,
      include: {
        estudante: {
          include: {
            user: true,
          },
        },
        professor: {
          include: {
            user: true,
          },
        },
        discipline: true,
      },
    });
  }

  async findAll(take: number, skip: number) {
    return await this.database.avaliacao.findMany({
      take,
      skip,
      include: {
        estudante: {
          include: {
            user: true,
          },
        },
        professor: {
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
        estudante: {
          include: {
            user: true,
          },
        },
        professor: {
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
