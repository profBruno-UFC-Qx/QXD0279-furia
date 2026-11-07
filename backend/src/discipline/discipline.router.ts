import { Router } from "express";

import { DisciplineController } from "./discipline.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createdisciplineRouter(
  disciplineController: DisciplineController,
) {
  const disciplineRouter = Router();
  disciplineRouter.post("/discipline", disciplineController.create);
  disciplineRouter.get("/discipline", disciplineController.findAll);
  disciplineRouter.get("/discipline/name", disciplineController.findAllNames);
  disciplineRouter.delete(
    "/discipline/:id",
    AutorizationMiddleware(["admin"]),
    disciplineController.delete,
  );
  disciplineRouter.put(
    "/discipline/:id",
    AutorizationMiddleware(["admin"]),
    disciplineController.update,
  );

  return disciplineRouter;
}
