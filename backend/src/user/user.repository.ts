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

  async findAll(take = 100, skip = 0) {
    return await this.database.user.findMany({
      take,
      skip,
      orderBy: { user_id: "asc" },
      where: {
        role: {
          not: "admin",
        },
      },
      select: {
        name: true,
        role: true,
        email: true,
      },
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

  async deleteUserByEmail(email: string) {
    try {
      const a = await this.database.user.delete({
        where: { email },
      });
      console.log(a);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async count() {
    return this.database.user.count();
  }

  async getStats() {
    const [qtd_users, qtd_students, qtd_teachers, qtd_admins] =
      await Promise.all([
        this.database.user.count(),
        this.database.user.count({
          where: { role: "student" },
        }),
        this.database.user.count({
          where: { role: "teacher" },
        }),
        this.database.user.count({
          where: { role: "admin" },
        }),
      ]);

    return {
      qtd_users,
      qtd_students,
      qtd_teachers,
      qtd_admins,
    };
  }
}
