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
      email,
    });
  }

  async findUserById(userId: number) {
    return await this.userRepository.findOneBy({
      user_id: userId,
    });
  }

  async createUser(userData: UserDTO) {
    const user = this.userRepository.create({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    });

    return await this.userRepository.save(user);
  }

  async updateUser(userId: number, userData: Partial<UserDTO>) {
    await this.userRepository.update(userId, userData);
    return await this.findUserById(userId);
  }

  async deleteUser(userId: number) {
    const result = await this.userRepository.delete(userId);
    return (result.affected ?? 0) > 0;
  }
}
