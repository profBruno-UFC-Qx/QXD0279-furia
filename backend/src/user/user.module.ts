import { UserRepository } from "./user.repository.ts";
import { UserService } from "./user.service.ts";
import { UserController } from "./user.controller.ts";
import { createUserRouter } from "./user.router.ts";
import { databaseInstance } from "../database/dataBase.ts";

const userRepositoryInstance = new UserRepository(databaseInstance);
const userServiceInstance = new UserService(userRepositoryInstance);
const userController = new UserController(userServiceInstance);
const userRouter = createUserRouter(userController);

export {
  userServiceInstance,
  userRepositoryInstance,
  userController,
  userRouter,
};
