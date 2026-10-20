import { UserRepository } from "./user.repository.ts";
import { UserService } from "./user.service.ts";
import { AppDataSource } from "../database/data-source.ts";

const userRepositoryInstance = new UserRepository(AppDataSource);
const userServiceInstance = new UserService(userRepositoryInstance);

export { userServiceInstance, userRepositoryInstance };
