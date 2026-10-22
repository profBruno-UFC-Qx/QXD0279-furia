import { DataSource, Repository } from "typeorm";
import { Discipline } from "../database/entities/Discipline.ts";
import { createDicipline } from "./dto/createDicipline.dto.ts";

export class DiciplineRepository {
  diciplineRepository: Repository<Discipline>;

  constructor(private database: DataSource) {
    this.diciplineRepository = this.database.getRepository(Discipline);
  }

  async create(diciplineData: createDicipline) {
    const discipline = this.diciplineRepository.create(diciplineData);
    return this.diciplineRepository.save(discipline);
  }

  async findAll() {
    return this.diciplineRepository.find();
  }

  async findById(id: number) {
    return this.diciplineRepository.findOne({
      where: { dicipline_id: id },
    });
  }

  async findByName(name: string) {
    return this.diciplineRepository.findOne({
      where: { name },
    });
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
