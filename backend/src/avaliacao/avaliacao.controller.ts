import { Request, Response } from "express";
import { BadRequestError } from "../errors/errors.ts";
import { AvaliacaoService } from "./avaliacao.service.ts";
import {
  avaliacaoSchema,
  updateAvaliacaoSchema,
} from "./schema/avaliacao.schema.ts";

export class AvaliacaoController {
  constructor(private service: AvaliacaoService) {}

  create = async (req: Request, res: Response) => {
    const parsedAvaliacao = avaliacaoSchema.safeParse(req.body);

    if (!parsedAvaliacao.success) {
      throw new BadRequestError(
        "Dados de avaliação mal formatados",
        parsedAvaliacao.error,
      );
    }

    const avaliacao = await this.service.create(parsedAvaliacao.data);
    return res.status(201).json(avaliacao);
  };

  findAll = async (req: Request, res: Response) => {
    const take = Number(req.query.limit) || 100;
    const page = Number(req.query.page) || 1;

    const skip = (page - 1) * take;

    const avaliacoes = await this.service.findAll(take, skip);
    return res.status(200).json(avaliacoes);
  };

  findById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de avaliação inválido");
    }

    const avaliacao = await this.service.findById(id);
    return res.status(200).json(avaliacao);
  };

  update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de avaliação inválido");
    }

    const parsedAvaliacao = updateAvaliacaoSchema.safeParse(req.body);

    if (!parsedAvaliacao.success) {
      throw new BadRequestError(
        "Dados de atualização da avaliação mal formatados",
        parsedAvaliacao.error,
      );
    }

    const avaliacao = await this.service.update(id, parsedAvaliacao.data);
    return res.status(200).json(avaliacao);
  };

  delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new BadRequestError("ID de avaliação inválido");
    }

    await this.service.delete(id);
    return res.status(204).send();
  };
}
