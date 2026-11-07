import { DisciplineController } from "./discipline.controller.ts";
import { disciplineRepository } from "./discipline.repository.ts";
import { disciplineService } from "./discipline.service.ts";
import { createdisciplineRouter } from "./discipline.router.ts";
import { databaseInstance } from "../database/dataBase.ts";

const disciplineRepositoryInstance = new disciplineRepository(databaseInstance);
const disciplineServiceInstance = new disciplineService(
  disciplineRepositoryInstance,
);
const disciplineControllerInstance = new DisciplineController(
  disciplineServiceInstance,
);
const disciplineRouter = createdisciplineRouter(disciplineControllerInstance);

export { disciplineRouter, disciplineRepositoryInstance };
