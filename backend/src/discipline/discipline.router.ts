import { Router } from "express";

import { AuthMiddleware } from "../auth/middlewares/auth.middleware.ts";
import { DisciplineController } from "./discipline.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createdisciplineRouter(
  disciplineController: DisciplineController,
) {
  const disciplineRouter = Router();

  disciplineRouter.get("/discipline/name", disciplineController.findAllNames);

  disciplineRouter.post(
    "/discipline",
    AuthMiddleware,
    disciplineController.create,
  );
  disciplineRouter.get(
    "/discipline",
    AuthMiddleware,
    disciplineController.findAll,
  );
  disciplineRouter.delete(
    "/discipline/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    disciplineController.delete,
  );
  disciplineRouter.put(
    "/discipline/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    disciplineController.update,
  );

  return disciplineRouter;
}
