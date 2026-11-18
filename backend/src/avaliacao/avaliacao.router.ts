import { Router } from "express";
import { AuthMiddleware } from "../auth/middlewares/auth.middleware.ts";
import { AvaliacaoController } from "./avaliacao.controller.ts";
import { AutorizationMiddleware } from "../middlewares/autorization.middleware.ts";

export function createAvaliacaoRouter(
  avaliacaoController: AvaliacaoController,
) {
  const avaliacaoRouter = Router();

  avaliacaoRouter.post(
    "/avaliacao",
    AuthMiddleware,
    AutorizationMiddleware(["student"]),
    avaliacaoController.create,
  );
  avaliacaoRouter.get(
    "/avaliacao",
    AuthMiddleware,
    avaliacaoController.findAll,
  );
  avaliacaoRouter.get(
    "/avaliacao/me",
    AuthMiddleware,
    avaliacaoController.findMine,
  );
  avaliacaoRouter.get(
    "/avaliacao/me/count",
    AuthMiddleware,
    avaliacaoController.countMine,
  );
  avaliacaoRouter.get(
    "/avaliacao/:id",
    AuthMiddleware,
    avaliacaoController.findById,
  );
  avaliacaoRouter.put(
    "/avaliacao/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    avaliacaoController.update,
  );
  avaliacaoRouter.delete(
    "/avaliacao/:id",
    AuthMiddleware,
    AutorizationMiddleware(["admin"]),
    avaliacaoController.delete,
  );

  return avaliacaoRouter;
}
