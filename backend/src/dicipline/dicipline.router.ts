import { Router } from "express";

import { DiciplineController } from "./dicipline.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createDiciplineRouter(
  diciplineController: DiciplineController,
) {
  const diciplineRouter = Router();
  diciplineRouter.post("/dicipline", diciplineController.create);
  diciplineRouter.get("/dicipline", diciplineController.findAll);
  diciplineRouter.get("/discipline/name", diciplineController.findAllNames);
  diciplineRouter.delete(
    "/discipline/:id",
    AutorizationMiddleware(["admin"]),
    diciplineController.delete,
  );
  diciplineRouter.put(
    "/discipline/:id",
    AutorizationMiddleware(["admin"]),
    diciplineController.update,
  );

  return diciplineRouter;
}
