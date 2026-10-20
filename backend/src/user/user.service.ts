import { UserRepository } from "./user.repository.ts";
import { UserDTO } from "./dto/user.dto.ts";
import { Conflict } from "../errors/errors.ts";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async registerUser(user: UserDTO) {
    const { password, email } = user;

    const alreadyExists = await this.userRepository.findUserByEmail(email);

    if (alreadyExists) {
      throw new Conflict("E-mail ja cadastrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    user.password = passwordHash;

    const createdStudent = await this.userRepository.createUser(user);

    return createdStudent;
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
  }
}
