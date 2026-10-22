import { DiciplineController } from "./dicipline.controller.ts";
import { DiciplineRepository } from "./dicipline.repository.ts";
import { DiciplineService } from "./dicipline.service.ts";
import { createDiciplineRouter } from "./dicipline.router.ts";
import { AppDataSource } from "../database/data-source.ts";

const diciplineRepositoryInstance = new DiciplineRepository(AppDataSource);
const diciplineServiceInstance = new DiciplineService(
  diciplineRepositoryInstance,
);
const diciplineControllerInstance = new DiciplineController(
  diciplineServiceInstance,
);
const diciplineRouter = createDiciplineRouter(diciplineControllerInstance);

export { diciplineRouter, diciplineRepositoryInstance };
