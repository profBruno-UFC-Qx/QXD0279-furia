import { UserRepository } from "./user.repository.ts";
import { UserService } from "./user.service.ts";
import { AppDataSource } from "../database/data-source.ts";

const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);

export { userService, userRepository };
