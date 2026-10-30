import { UserRepository } from "./user.repository.ts";
import { UserDTO } from "./dto/user.dto.ts";
import { Conflict, NotFoundError } from "../errors/errors.ts";
import { pagWrapper } from "../utils/pagWrapper.ts";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: UserDTO) {
    const { password, email } = user;

    const alreadyExists = await this.userRepository.findUserByEmail(email);

    if (alreadyExists) {
      throw new Conflict("E-mail ja cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;

    return await this.userRepository.createUser(user);
  }

  async createUserInTransaction(user: UserDTO, tx?: any) {
    const { password, email } = user;

    const alreadyExists = await this.userRepository.findUserByEmail(email, tx);

    if (alreadyExists) {
      throw new Conflict("E-mail ja cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    user.password = passwordHash;

    return await this.userRepository.createUser(user, tx);
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }

  async findAll(take = 100, skip = 0) {
    const total = await this.userRepository.count();
    const data = await this.userRepository.findAll(take, skip);

    return { data: data, meta: pagWrapper(take, skip, total) };
  }

  async findById(id: number) {
    return await this.userRepository.findUserById(id);
  }

  async getStats() {
    return await this.userRepository.getStats();
  }

  async getsStatsHome() {
    return await this.userRepository.getsStatsHome();
  }

  async updateUser(userId: number, data: Partial<UserDTO>) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    if (data.email && data.email !== user.email) {
      const alreadyExists = await this.userRepository.findUserByEmail(
        data.email,
      );

      if (alreadyExists && alreadyExists.user_id !== userId) {
        throw new Conflict("E-mail ja cadastrado");
      }
    }

    if (data.password) {
      const passwordHash = await bcrypt.hash(data.password, 10);
      data = { ...data, password: passwordHash };
    }

    const updatedUser = await this.userRepository.updateUser(userId, data);
    if (!updatedUser) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    return updatedUser;
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    return await this.userRepository.deleteUser(userId);
  }

  async deleteUserByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new NotFoundError("Usuario nao encontrado");
    }

    return await this.userRepository.deleteUserByEmail(email);
  }
}
