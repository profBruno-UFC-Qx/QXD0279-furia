import { UserRepository } from "./user.repository.ts";
import { UserService } from "./user.service.ts";
import { databaseInstance } from "../database/dataBase.ts";
const userRepositoryInstance = new UserRepository(databaseInstance);
const userServiceInstance = new UserService(userRepositoryInstance);

export { userServiceInstance, userRepositoryInstance };
