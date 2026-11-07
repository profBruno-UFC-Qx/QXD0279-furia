import { Router } from "express";

import { DiciplineController } from "./dicipline.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createDiciplineRouter(
  diciplineController: DiciplineController,
) {
  const diciplineRouter = Router();
  diciplineRouter.post(
    "/dicipline",
    AutorizationMiddleware(["admin"]),
    diciplineController.create,
  );
  diciplineRouter.get("/discipline", diciplineController.findAll);
  // diciplineRouter.get(
  //   "public/discipline/name",
  //   diciplineController.findAllNames,
  // );
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
