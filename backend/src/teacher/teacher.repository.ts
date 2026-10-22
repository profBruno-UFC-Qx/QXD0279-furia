import { DataSource, Repository } from "typeorm";
import { Teacher } from "../database/entities/Teacher.ts";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { TeacherDTO } from "./dto/teacher.dto.ts";
import { DiciplineRepository } from "../dicipline/dicipline.repository.ts";

export class TeacherRepository {
  private teacherRepository: Repository<Teacher>;

  constructor(
    private database: DataSource,
    private disciplineRepository: DiciplineRepository,
  ) {
    this.teacherRepository = this.database.getRepository(Teacher);
  }

  async createTeacher(user: GenericUser, teacherData: TeacherDTO) {
    const disciplines = await this.disciplineRepository.findByIds(
      teacherData.disciplines,
    );

    const teacher = this.teacherRepository.create({
      user,
      disciplines,
    });

    return await this.teacherRepository.save(teacher);
  }

  async findAll() {
    return await this.teacherRepository.find({
      relations: { user: true },
    });
  }

  async findById(id: number) {
    return await this.teacherRepository.findOne({
      where: { teacher_id: id },
      relations: { user: true },
    });
  }

  async deleteTeacher(id: number) {
    const result = await this.teacherRepository.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
