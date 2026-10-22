import { DiciplineController } from "./dicipline.controller.ts";
import { DiciplineRepository } from "./dicipline.repository.ts";
import { DiciplineService } from "./dicipline.service.ts";
import { createDiciplineRouter } from "./dicipline.router.ts";
import { databaseInstance } from "../database/dataBase.ts";

const diciplineRepositoryInstance = new DiciplineRepository(databaseInstance);
const diciplineServiceInstance = new DiciplineService(
  diciplineRepositoryInstance,
);
const diciplineControllerInstance = new DiciplineController(
  diciplineServiceInstance,
);
const diciplineRouter = createDiciplineRouter(diciplineControllerInstance);

export { diciplineRouter, diciplineRepositoryInstance };
