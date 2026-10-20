import { DataSource, Repository } from "typeorm";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { CreateTeacherDTO } from "./dto/createTeacher.dto.ts";

export class TeacherRepository {
  userRepository: Repository<GenericUser>;
  constructor(private database: DataSource) {
    this.userRepository = this.database.getRepository(GenericUser);
  }

  async createTeacher(teacherData: CreateTeacherDTO) {}
}
