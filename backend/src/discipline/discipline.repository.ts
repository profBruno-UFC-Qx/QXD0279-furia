import { createDiscipline } from "./dto/createDiscipline.dto.ts";
import { DataBase } from "../database/dataBase.ts";
import { disciplineUpdateDTO } from "./dto/disciplineUpdate.dto.ts";

export class disciplineRepository {
  constructor(private database: DataBase) {}

  async create(disciplineData: createDiscipline) {
    return this.database.discipline.create({
      data: {
        name: disciplineData.name,
        course: disciplineData.course,
        hours: disciplineData.hours,
      },
    });
  }

  async findAll(take: number, skip: number) {
    return this.database.discipline.findMany({
      take,
      skip,
    });
  }

  async findById(id: number) {
    return this.database.discipline.findUnique({
      where: { discipline_id: id },
    });
  }

  async findByIds(ids: number[]) {
    return this.database.discipline.findMany({
      where: { discipline_id: { in: ids } },
    });
  }

  async findByName(name: string) {
    return this.database.discipline.findFirst({
      where: { name },
    });
  }

  async count() {
    return this.database.discipline.count();
  }

  async findAllNames() {
    return this.database.discipline.findMany({
      select: {
        name: true,
      },
    });
  }

  async update(
    id: number,
    data: Partial<disciplineUpdateDTO>,
  ): Promise<disciplineUpdateDTO | null> {
    const discipline = await this.findById(id);

    if (!discipline) return null;

    return this.database.discipline.update({
      where: { discipline_id: id },
      data: data,
    });
  }

  async delete(id: number): Promise<boolean> {
    try {
      const result = await this.database.discipline.delete({
        where: { discipline_id: id },
      });
      return true;
    } catch (e) {
      return false;
    }
  }
}
