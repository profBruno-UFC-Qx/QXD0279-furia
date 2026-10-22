import { UserDTO } from "./dto/user.dto.ts";
import { DataBase } from "../database/dataBase.ts";

export class UserRepository {
  constructor(private database: DataBase) {}

  async findUserByEmail(email: string) {
    return await this.database.user.findUnique({
      where: { email },
    });
  }

  async findUserById(userId: number) {
    return await this.database.user.findUnique({
      where: { user_id: userId },
    });
  }

  async createUser(userData: UserDTO) {
    return await this.database.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      },
    });
  }

  async updateUser(userId: number, userData: Partial<UserDTO>) {
    return await this.database.user.update({
      where: { user_id: userId },
      data: { ...userData },
    });
  }

  async deleteUser(userId: number) {
    try {
      await this.database.user.delete({
        where: { user_id: userId },
      });
      return true;
    } catch {
      return false;
    }
  }
}
