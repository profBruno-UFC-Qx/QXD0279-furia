import { DataSource, Repository } from "typeorm";
import { GenericUser } from "../database/entities/GenericUser.ts";
import { UserDTO } from "./dto/user.dto.ts";

export class UserRepository {
  userRepository: Repository<GenericUser>;
  constructor(private database: DataSource) {
    this.userRepository = this.database.getRepository(GenericUser);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOneBy({
      email: email,
    });
  }

  async createUser(userData: UserDTO) {
    const user = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });

    const savedUser = await this.userRepository.save(user);

    return savedUser;
  }

}
