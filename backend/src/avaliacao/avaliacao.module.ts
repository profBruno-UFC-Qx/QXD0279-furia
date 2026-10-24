import { AvaliacaoController } from "./avaliacao.controller.ts";
import { AvaliacaoRepository } from "./avaliacao.repository.ts";
import { AvaliacaoService } from "./avaliacao.service.ts";
import { createAvaliacaoRouter } from "./avaliacao.router.ts";
import { databaseInstance } from "../database/dataBase.ts";

const avaliacaoRepository = new AvaliacaoRepository(databaseInstance);
const avaliacaoService = new AvaliacaoService(avaliacaoRepository);
const avaliacaoController = new AvaliacaoController(avaliacaoService);
const avaliacaoRouter = createAvaliacaoRouter(avaliacaoController);

export { avaliacaoRouter, avaliacaoService, avaliacaoRepository };
