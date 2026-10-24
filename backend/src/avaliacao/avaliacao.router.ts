import { Router } from "express";
import { AvaliacaoController } from "./avaliacao.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createAvaliacaoRouter(
  avaliacaoController: AvaliacaoController,
) {
  const avaliacaoRouter = Router();

  avaliacaoRouter.post(
    "/avaliacao",
    AutorizationMiddleware(["student"]),
    avaliacaoController.create,
  );
  avaliacaoRouter.get("/avaliacao", avaliacaoController.findAll);
  avaliacaoRouter.get("/avaliacao/me", avaliacaoController.findMine);
  avaliacaoRouter.get("/avaliacao/me/count", avaliacaoController.countMine);
  avaliacaoRouter.get("/avaliacao/:id", avaliacaoController.findById);
  avaliacaoRouter.put(
    "/avaliacao/:id",
    AutorizationMiddleware(["admin"]),
    avaliacaoController.update,
  );
  avaliacaoRouter.delete(
    "/avaliacao/:id",
    AutorizationMiddleware(["admin"]),
    avaliacaoController.delete,
  );

  return avaliacaoRouter;
}
