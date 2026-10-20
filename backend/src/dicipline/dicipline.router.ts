import { Router } from "express";

import { DiciplineController } from "./dicipline.controller.ts";

export function createDiciplineRouter(diciplineController: DiciplineController) {
  const diciplineRouter = Router();
  diciplineRouter.post("/dicipline", diciplineController.create);

  return diciplineRouter;
}
