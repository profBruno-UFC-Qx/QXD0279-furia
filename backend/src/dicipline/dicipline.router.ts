import { Router } from "express";

import { DiciplineController } from "./dicipline.controller.ts";

export function createDiciplineRouter(
  diciplineController: DiciplineController,
) {
  const diciplineRouter = Router();
  diciplineRouter.post("/dicipline", diciplineController.create);
  diciplineRouter.get("/dicipline", diciplineController.findAll);
  diciplineRouter.get("/discipline/name", diciplineController.findAllNames); // paginacao

  return diciplineRouter;
}
