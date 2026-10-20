import { DiciplineController } from "./dicipline.controller.ts";
import { DiciplineRepository } from "./dicipline.repository.ts";
import { DiciplineService } from "./dicipline.service.ts";
import { createDiciplineRouter } from "./dicipline.router.ts";
import { AppDataSource } from "../database/data-source.ts";

const diciplineRepository = new DiciplineRepository(AppDataSource);
const diciplineService = new DiciplineService(diciplineRepository);
const diciplineController = new DiciplineController(diciplineService);
const diciplineRouter = createDiciplineRouter(diciplineController);

export { diciplineRouter };
