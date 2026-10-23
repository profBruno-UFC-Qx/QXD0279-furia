import { createDicipline } from "./dto/createDicipline.dto.ts";
import { DataBase } from "../database/dataBase.ts";

export class DiciplineRepository {
  constructor(private database: DataBase) {}

  async create(diciplineData: createDicipline) {
    return this.database.discipline.create({
      data: {
        name: diciplineData.name,
        course: diciplineData.course,
        hours: diciplineData.hours,
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

  //   async update(
  //     id: number,
  //     data: Partial<Discipline>,
  //   ): Promise<Discipline | null> {
  //     const discipline = await this.findById(id);

  //     if (!discipline) return null;

  //     this.diciplineRepository.merge(discipline, data);
  //     return this.diciplineRepository.save(discipline);
  //   }

  //   async delete(id: number): Promise<boolean> {
  //     const result = await this.diciplineRepository.delete(id);
  //     return (result.affected ?? 0) > 0;
  //   }
}
