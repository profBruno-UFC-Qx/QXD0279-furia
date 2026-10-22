import { DiciplineRepository } from "./dicipline.repository.ts";
import { createDicipline } from "./dto/createDicipline.dto.ts";
import { Conflict } from "../errors/errors.ts";

export class DiciplineService {
  constructor(private repository: DiciplineRepository) {}

  async create(data: createDicipline) {
    const dicipline = await this.repository.findByName(data.name);

    if (dicipline) {
      throw new Conflict("Diciplina ja cadastrada");
    }

    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  //   async findById(id: number) {
  //     const discipline = await this.repository.findById(id);

  //     if (!discipline) {
  //       throw new Error("Disciplina não encontrada");
  //     }

  //     return discipline;
  //   }

  //   async update(id: number, data: Partial<Discipline>) {
  //     const discipline = await this.repository.update(id, data);

  //     if (!discipline) {
  //       throw new Error("Disciplina não encontrada");
  //     }

  //     return discipline;
  //   }

  //   async delete(id: number) {
  //     const deleted = await this.repository.delete(id);

  //     if (!deleted) {
  //       throw new Error("Disciplina não encontrada");
  //     }
  //   }
}
