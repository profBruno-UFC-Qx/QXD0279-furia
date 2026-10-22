import { UserDTO } from "./dto/user.dto.ts";
import { DataBase } from "../database/dataBase.ts";

export class UserRepository {
  constructor(private database: DataBase) {}

  async findUserByEmail(email: string, tx?: any) {
    const prisma = tx ?? this.database;

    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(userId: number, tx?: any) {
    const prisma = tx ?? this.database;

    return await prisma.user.findUnique({
      where: { user_id: userId },
    });
  }

  async createUser(userData: UserDTO, tx?: any) {
    const prisma = tx ?? this.database;

    return await prisma.user.create({
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
