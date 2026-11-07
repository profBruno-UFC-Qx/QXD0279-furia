import { disciplineRepository } from "./discipline.repository.ts";
import { createDiscipline } from "./dto/createDiscipline.dto.ts";
import { Conflict } from "../errors/errors.ts";
import { pagWrapper } from "../utils/pagWrapper.ts";
import { disciplineUpdateDTO } from "./dto/disciplineUpdate.dto.ts";

export class disciplineService {
  constructor(private repository: disciplineRepository) { }

  async create(data: createDiscipline) {
    const discipline = await this.repository.findByName(data.name);

    if (discipline) {
      throw new Conflict("Diciplina ja cadastrada");
    }

    return this.repository.create(data);
  }

  async findAll(take: number, skip: number) {
    const total = await this.repository.count();
    const data = await this.repository.findAll(take, skip);
    return { data, meta: pagWrapper(take, skip, total) };
  }

  async findById(id: number) {
    const discipline = await this.repository.findById(id);

    if (!discipline) {
      throw new Error("Disciplina não encontrada");
    }

    return discipline;
  }

  async findAllNames() {
    return this.repository.findAllNames();
  }

  async update(id: number, data: Partial<disciplineUpdateDTO>) {
    const discipline = await this.repository.update(id, data);

    if (!discipline) {
      throw new Error("Disciplina não encontrada");
    }

    return discipline;
  }

  async delete(id: number) {
    const deleted = await this.repository.delete(id);

    if (!deleted) {
      throw new Error("Disciplina não encontrada");
    }

    return deleted;
  }
}
